import { useParams } from "react-router-dom"
import {Tldraw} from 'tldraw'
import type { Editor } from "tldraw"
import { useState } from "react"
import { useTransition } from "react"
import FullScreenLoader from "@/components/FullScreenLoader"
import 'tldraw/tldraw.css'

export default function() {

    const { editorID } = useParams()
    const [editor, setEditor] = useState<Editor>(null)
    const [isPending, startTransition] = useTransition()

    function handleMount(e: Editor) {
        setEditor(e)
        startTransition(async () => {
            const response = await window.api.getFileData(parseInt(editorID))
            if(!response.success) {
                alert("Error fetching file: " + response.message)
                return
            }
            if(response.data) {
                const data = JSON.parse(response.data)
                e.loadSnapshot(data)
            }
        })
    }

    function handleSave() {
        if(!editor) return

        startTransition(async () => {
            const data = editor.getSnapshot()
            const response = await window.api.saveFile(parseInt(editorID), JSON.stringify(data))
            if(!response.success) {
                alert("Error saving file: " + response.message)
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isPending && <FullScreenLoader/>}
            <h1>Editing: {editorID}</h1>
            <button onClick={handleSave} >Save</button>
            <Tldraw onMount={handleMount} className="prose min-w-full">
            </Tldraw>
        </div>
    )
}