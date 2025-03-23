import { contextBridge, ipcRenderer } from "electron/renderer"

const api: Window["api"] = {
    filelist: (currdir:string) => ipcRenderer.invoke('file:list',currdir),
    createDir: (currdir:string) => ipcRenderer.invoke('file:createDir',currdir),
    isFirstTime: () => ipcRenderer.invoke('config:isFirstTime'),
    updatePath: () => ipcRenderer.invoke('config:updatePath')
}

contextBridge.exposeInMainWorld('api', api)