import {app,BrowserWindow, ipcMain, Menu} from "electron"
import fs from "node:fs"
import path from "node:path"
import { createSchema } from "./db/schema.js"
import { createNewFolder, getFilesInFolder, getFoldersInFolder } from "./helpers/folders.js"
import { createNewFile, getFileData, saveFile, deleteFile, renameFile } from "./helpers/files.js"
import { deleteFolder, renameFolder } from "./helpers/folders.js"

let configPath = path.join(app.getPath('userData'), 'config.json')

app.on("ready", () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(),isDev()?'.':'..','/out/electron/preload.cjs')
        }
    })
    
    ipcMain.handle('config:isNewUser', async ():Promise<ApiResponse<boolean>> => {
        return ApiResponse(true, !doesConfigExist())
    })

    ipcMain.handle('config:initNew', async ():Promise<ApiResponse<void>> => {
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

    ipcMain.handle('folder:contents', async (_, parentID: number):Promise<ApiResponse<FolderContents>> => {
        try {
            const folders = (await getFoldersInFolder(parentID)).rows
            const files = (await getFilesInFolder(parentID)).rows
            return ApiResponse(true, {
                folders: folders.map((folder) => {
                    return {
                        id: folder.id as number,
                        name: folder.name as string
                    }
                }),
                files: files.map((file) => {
                    return {
                        id: file.id as number,
                        name: file.name as string
                    }
                })
            })
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('folder:new', async (_, name: string, parentID: number) => {
        try {
            await createNewFolder(name, parentID)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:new', async (_, name: string, parentID: number) => {
        try {
            await createNewFile(name, parentID)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:save', async (_, fileID: number, data: string): Promise<ApiResponse<void>> => {
        try {
            await saveFile(fileID, data)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:getData', async (_, fileID: number): Promise<ApiResponse<string>> => {
        try {
            const result = (await getFileData(fileID)).rows[0]
            const data = result.data as string
            return ApiResponse(true,data)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:delete', async (_, fileID: number): Promise<ApiResponse<void>> => {
        try {
            await deleteFile(fileID)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('folder:delete', async (_, folderID: number): Promise<ApiResponse<void>> => {
        try {
            await deleteFolder(folderID)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('file:rename', async (_, fileID: number, newName: string): Promise<ApiResponse<void>> => {
        try {
            await renameFile(fileID, newName)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    ipcMain.handle('folder:rename', async (_, folderID: number, newName: string): Promise<ApiResponse<void>> => {
        try {
            await renameFolder(folderID, newName)
            return ApiResponse(true)
        } catch(e) {
            console.error(e)
            return ApiResponse(false)
        }
    })

    if(isDev()) {
        window.loadURL('http://localhost:5173')
    } else {
        Menu.setApplicationMenu(null)
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

export function isDev() {
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
