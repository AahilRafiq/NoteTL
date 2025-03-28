import {app,BrowserWindow, ipcMain, dialog} from "electron"
import fs from "node:fs"
import path from "node:path"
import { createSchema } from "./db/schema.js"

let configPath = path.join(app.getPath('userData'), 'config.json')

app.on("ready", () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(),isDev()?'.':'..','/out/electron/preload.cjs')
        }
    })
    
    ipcMain.handle('config:isNewUser', async (event):Promise<ApiResponse<boolean>> => {
        return ApiResponse(true, !doesConfigExist())
    })

    ipcMain.handle('config:initNew', async (event):Promise<ApiResponse<void>> => {
        try {
            createNewConfig()
            await createSchema()
            console.log('New db initialized')
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:list', async (event, currdir: string) => {
        // TODO: implement
    })

    ipcMain.handle('file:createDir', async (event, currdir: string) => {
        // TODO: implement
    })

    if(isDev()) {
        window.loadURL('http://localhost:5173')
    } else {
        window.loadFile(path.join(app.getAppPath(),'/out/ui/index.html'))
    }
})

export function getAppPath() {
    return app.getPath('userData')
}

// Helper functions
function ApiResponse<T>(success: boolean,data?: T, message?: string ): ApiResponse<T> {
    return {success, data, message}
}

function isDev() {
    return process.env.NODE_ENV === 'development'
}

function createNewConfig() {
    const newConfig: Config = {
        theme: 'light'
    }
    fs.writeFileSync(configPath, JSON.stringify(newConfig))
}

function doesConfigExist() {
    return fs.existsSync(configPath)
}

interface Config {
    theme: string
}