import { contextBridge, ipcRenderer } from "electron/renderer"

const api: Window["api"] = {
    getFolderContents: (parentID: number) => ipcRenderer.invoke('folder:contents',parentID),
    createNewFolder: (name:string, parentID: number) => ipcRenderer.invoke('folder:new',name,parentID),
    isNewUser: () => ipcRenderer.invoke('config:isNewUser'),
    initNew: () => ipcRenderer.invoke('config:initNew')
}

contextBridge.exposeInMainWorld('api', api)