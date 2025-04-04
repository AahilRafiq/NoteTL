import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FolderPlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import FullScreenLoader from "../FullScreenLoader"
import { toast } from "sonner"

interface IProps {
    parentFolderID: number,
    refreshContents?: () => void
}

export default function ({parentFolderID, refreshContents}:IProps) {

    const [folderName, setFolderName] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateFolder(){
        const pfid = parentFolderID === 0 ? null : parentFolderID
        setLoading(true)
        const res = await window.api.createNewFolder(folderName, pfid)
        setLoading(false)
        if(res.success){
            refreshContents()
        }else{
            toast.error(res.message)
        }
    }

    if(loading) {
        return <FullScreenLoader />
    }
    return (

        <AlertDialog>
            <AlertDialogTrigger asChild>

                <Button variant="ghost" size="lg">
                    <FolderPlusIcon className="min-w-5 min-h-5"/>
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent className="dark text-white bg-gray-950">
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Folder Name</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input onChange={e=>setFolderName(e.target.value)} placeholder="Folder Name" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCreateFolder}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}