import { FileTextIcon, MoreVerticalIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import FullScreenLoader from "../FullScreenLoader";
import { toast } from "sonner";

export default function ({ fileName, fileID, refreshContents }: { fileName: string, fileID: number, refreshContents: () => void }) {

    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [loading, setLoading] = useState(false);

    const trimmedFileName = fileName.length > 12 ? fileName.substring(0, 12) + "..." : fileName;

    async function handleDeleteFile() {
        setLoading(true);
        const res = await window.api.deleteFile(fileID);
        setLoading(false);
        if (res.success) {
            refreshContents();
        } else {
            toast.error(res.message);
        }
    }

    async function handleRenameFile() {
        setLoading(true);
        const res = await window.api.renameFile(fileID, newFileName);
        setLoading(false);
        if (res.success) {
            refreshContents();
            setIsRenameModalOpen(false);
        } else {
            toast.error(res.message);
        }
    }

    if (loading) {
        return <FullScreenLoader />;
    }

    return (
        <div className="relative w-40 h-15 bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Link to={`/editor/${fileID}`} className="flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-slate-100" />
                <span className="font-large">{trimmedFileName}</span>
            </Link>
            <div className="absolute top-2 right-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <MoreVerticalIcon className="w-5 h-5" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>File Options</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            <button onClick={handleDeleteFile} className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Delete</button>
                            <button onClick={() => setIsRenameModalOpen(true)} className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Rename</button>
                        </AlertDialogDescription>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            {isRenameModalOpen && (
                <AlertDialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Rename File</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input onChange={e => setNewFileName(e.target.value)} placeholder="New File Name" />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsRenameModalOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRenameFile}>Save</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
