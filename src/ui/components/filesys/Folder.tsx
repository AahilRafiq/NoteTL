import { FolderIcon, MoreVerticalIcon } from "lucide-react";
import { useFolderNavStore } from "@/zustand/folderNavStore";
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

export default function ({ folderName, folderID, refreshContents }: { folderName: string, folderID: number, refreshContents: () => void }) {

    const setCurrFolderID = useFolderNavStore(state => state.setCurrFolderID)
    const folders = useFolderNavStore(state => state.folders)
    const updateFolders = useFolderNavStore(state => state.updateFolders)
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [loading, setLoading] = useState(false);

    const trimmedFolderName = folderName.length > 10 ? folderName.substring(0, 10) + "..." : folderName;

    function handleFolderClick() {
        setCurrFolderID(folderID)
        updateFolders([...folders, { name: folderName, id: folderID }])
    }

    async function handleDeleteFolder() {
        setLoading(true);
        const res = await window.api.deleteFolder(folderID);
        setLoading(false);
        if (res.success) {
            refreshContents();
        } else {
            toast.error(res.message);
        }
    }

    async function handleRenameFolder() {
        setLoading(true);
        const res = await window.api.renameFolder(folderID, newFolderName);
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
            <button onClick={handleFolderClick} className="flex items-center gap-2">
                <FolderIcon className="w-5 h-5 text-slate-100" />
                <span className="font-large">{trimmedFolderName}</span>
            </button>
            <div className="absolute top-2 right-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            <MoreVerticalIcon className="w-5 h-5" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Folder Options</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            <button onClick={handleDeleteFolder} className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Delete</button>
                            <button onClick={() => setIsRenameModalOpen(true)} className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Rename</button>
                        </AlertDialogDescription>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            {isRenameModalOpen && (
                <AlertDialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Rename Folder</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input onChange={e => setNewFolderName(e.target.value)} placeholder="New Folder Name" />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsRenameModalOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRenameFolder}>Save</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
}
