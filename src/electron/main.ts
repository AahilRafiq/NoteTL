import {app,BrowserWindow, ipcMain, dialog} from "electron"
import fs from "node:fs"
import path from "node:path"

let configPath = path.join(app.getPath('userData'), 'config.json')
let config: Config

app.on("ready", () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(),isDev()?'.':'..','/out/electron/preload.cjs')
        }
    })
    
    // Load config
    if(doesConfigExist()) {
        config = JSON.parse(fs.readFileSync(configPath).toString())
    } else {
        createNewConfig()
        config = {path: null}
    }
    console.log('Appdata:', configPath)


    ipcMain.handle('file:list', async (event, currdir: string):Promise<ApiResponse<{name: string, isDirectory: boolean}[]>> => {
        try {
            const list = await fs.promises.readdir(path.join(config.path!, currdir), { withFileTypes: true });
            const files = list.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory()
            }));
            return ApiResponse(true,files)
        } catch (e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:createDir', async (event, currdir: string):Promise<ApiResponse<void>> => {
        try {
            await fs.promises.mkdir(path.join(config.path!,currdir))
            return ApiResponse(true)
        } catch (e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('config:isFirstTime', async (event):Promise<ApiResponse<boolean>> => {
        return ApiResponse(true, config.path === null)
    })

    ipcMain.handle('config:updatePath', async (event): Promise<ApiResponse<void>> => {
        const path = await dialog.showOpenDialog(window, {
            properties: ['openDirectory']
        })
        if(path.canceled) {
            return ApiResponse(false)
        }

        if(path) {
            config.path = path.filePaths[0]
            fs.writeFileSync(configPath, JSON.stringify(config))
        }

        return ApiResponse(true)
    })

    if(isDev()) {
        window.loadURL('http://localhost:5173')
    } else {
        window.loadFile(path.join(app.getAppPath(),'/out/ui/index.html'))
    }
})


// Helper functions
function ApiResponse<T>(success: boolean,data?: T, message?: string ): ApiResponse<T> {
    return {success, data, message}
}

function isDev() {
    return process.env.NODE_ENV === 'development'
}

function createNewConfig() {
    fs.writeFileSync(configPath, JSON.stringify({path: null}))
}

function doesConfigExist() {
    return fs.existsSync(configPath)
}

interface Config {
    path: string | null
}