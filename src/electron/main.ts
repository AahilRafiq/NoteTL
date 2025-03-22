import {app,BrowserWindow, ipcMain} from "electron"
import fs from "node:fs"
import path from "node:path"

const DEFAULT_PATH = '/home/aahil/notetl'

app.on("ready", () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(),isDev()?'.':'..','/out/electron/preload.cjs')
        }
    })

    ipcMain.handle('file:list', async (event, currdir: string):Promise<ApiResponse<{name: string, isDirectory: boolean}[]>> => {
        try {
            const list = await fs.promises.readdir(path.join(DEFAULT_PATH, currdir), { withFileTypes: true });
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
            await fs.promises.mkdir(path.join(DEFAULT_PATH,currdir))
            return ApiResponse(true)
        } catch (e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    if(isDev()) {
        window.loadURL('http://localhost:5173')
    } else {
        window.loadFile(path.join(app.getAppPath(),'/out/ui/index.html'))
    }
})

function ApiResponse<T>(success: boolean,data?: T, message?: string ): ApiResponse<T> {
    return {success, data, message}
}

function isDev() {
    return process.env.NODE_ENV === 'development'
}