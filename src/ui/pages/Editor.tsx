import { useParams } from "react-router-dom"
import {Tldraw} from 'tldraw'
import type { Editor } from "tldraw"
import { useState } from "react"
import { useTransition } from "react"
import FullScreenLoader from "@/components/FullScreenLoader"
import 'tldraw/tldraw.css'
import { Button } from "@/components/ui/button"
import { useFolderNavStore } from "@/zustand/folderNavStore"
import { useNavigate } from "react-router-dom"
import { FileTextIcon, FolderIcon, FilePlusIcon } from "lucide-react"

export default function() {

    const { editorID } = useParams()
    const [editor, setEditor] = useState<Editor>(null)
    const [isPending, startTransition] = useTransition()
    const setCurrFolderID = useFolderNavStore(state => state.setCurrFolderID)
    const navigate = useNavigate()

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

    function handleClickBack() {
        const lastFolderID = useFolderNavStore.getState().folders[useFolderNavStore.getState().folders.length - 1].id
        setCurrFolderID(lastFolderID)
        navigate("/dashboard")
    }

    function addLucideComponent(component) {
        if (!editor) return

        const id = editor.createShapeId()
        editor.createShapes([
            {
                id,
                type: 'geo',
                props: {
                    w: 100,
                    h: 100,
                    geo: component,
                },
            },
        ])
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isPending && <FullScreenLoader/>}
            <div className="m-2 flex flex-row justify-between items-center w-full">
                <h1>Editing: {editorID}</h1>
                <div className="flex flex-row gap-2">
                    <Button onClick={handleSave} >Save</Button>
                    <Button onClick={handleClickBack} variant="secondary">Back</Button>
                    <Button onClick={() => addLucideComponent(FileTextIcon)} variant="secondary">Add File Icon</Button>
                    <Button onClick={() => addLucideComponent(FolderIcon)} variant="secondary">Add Folder Icon</Button>
                    <Button onClick={() => addLucideComponent(FilePlusIcon)} variant="secondary">Add File Plus Icon</Button>
                </div>
            </div>
            <Tldraw onMount={handleMount} className="prose dark:prose-invert min-w-full">
            </Tldraw>
        </div>
    )
}
