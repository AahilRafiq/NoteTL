import {app,BrowserWindow} from "electron"
import path from "node:path"

app.on("ready", () => {
    const window = new BrowserWindow()

    window.loadFile(path.join(app.getAppPath(),'/out/ui/index.html'))
})