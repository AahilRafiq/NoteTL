import { contextBridge, ipcRenderer } from "electron/renderer"

const api = {
    hello: () => ipcRenderer.invoke('hello')
}

contextBridge.exposeInMainWorld('api', api)