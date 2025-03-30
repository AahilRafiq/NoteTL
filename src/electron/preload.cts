import { contextBridge, ipcRenderer } from "electron/renderer"

const api: Window["api"] = {
    getFolderContents: (parentID: number) => ipcRenderer.invoke('folder:contents',parentID),
    createNewFolder: (name:string, parentID: number) => ipcRenderer.invoke('folder:new',name,parentID),
    createNewFile: (name: string, parentID: number) => ipcRenderer.invoke('file:new',name,parentID),
    saveFile: (fileID: number, data: string) => ipcRenderer.invoke('file:save',fileID,data),
    getFileData: (fileID: number) => ipcRenderer.invoke('file:getData',fileID),
    isNewUser: () => ipcRenderer.invoke('config:isNewUser'),
    initNew: () => ipcRenderer.invoke('config:initNew'),
    deleteFile: (fileID: number) => ipcRenderer.invoke('file:delete', fileID),
    deleteFolder: (folderID: number) => ipcRenderer.invoke('folder:delete', folderID),
    renameFile: (fileID: number, newName: string) => ipcRenderer.invoke('file:rename', fileID, newName),
    renameFolder: (folderID: number, newName: string) => ipcRenderer.invoke('folder:rename', folderID, newName)
}

contextBridge.exposeInMainWorld('api', api)
