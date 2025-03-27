import { contextBridge, ipcRenderer } from "electron/renderer"

const api: Window["api"] = {
    filelist: (currdir:string) => ipcRenderer.invoke('file:list',currdir),
    createDir: (currdir:string) => ipcRenderer.invoke('file:createDir',currdir),
    isNewUser: () => ipcRenderer.invoke('config:isNewUser'),
    initNew: () => ipcRenderer.invoke('config:initNew')
}

contextBridge.exposeInMainWorld('api', api)