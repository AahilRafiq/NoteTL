import {app,BrowserWindow, ipcMain} from "electron"
import path from "node:path"

app.on("ready", () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(),'/out/electron/preload.cjs')
        }
    })

    ipcMain.handle('hello', () => {
        return 'Hello from main'
    })
    window.loadFile(path.join(app.getAppPath(),'/out/ui/index.html'))
})