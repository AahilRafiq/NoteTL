import { useParams } from "react-router-dom"

export default function Editor() {

    const { editorID } = useParams()

    return (
        <div className="flex items-center justify-center h-screen">
            <h1>Editing: {editorID}</h1>
        </div>
    )
}