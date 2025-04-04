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
import { FilePlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import FullScreenLoader from "../FullScreenLoader"
import { toast } from "sonner"

interface IProps {
    parentFolderID: number,
    refreshContents?: () => void
}

export default function ({ parentFolderID , refreshContents}: IProps) {

    const [fileName, setFileName] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateFile() {
        const pfid = parentFolderID === 0 ? null : parentFolderID
        setLoading(true)
        const res = await window.api.createNewFile(fileName, pfid)
        setLoading(false)
        if (res.success) {
            refreshContents()
        } else {
            toast.error(res.message)
        }
    }

    if (loading) {
        return <FullScreenLoader />
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="lg">
                    <FilePlusIcon className="min-w-5 min-h-5" />
                    <span className="sr-only">New File</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark text-white bg-gray-950">
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter File Name</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input onChange={e => setFileName(e.target.value)} placeholder="File Name" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCreateFile}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
