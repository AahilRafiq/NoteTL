import { FolderIcon } from "lucide-react";
import { useFolderNavStore } from "@/zustand/folderNavStore";

export default function ({ folderName, folderID }: { folderName: string, folderID: number }) {
    
    const setCurrFolderID = useFolderNavStore(state => state.setCurrFolderID)
    const folders = useFolderNavStore(state => state.folders)
    const updateFolders = useFolderNavStore(state => state.updateFolders)
    const trimmedFolderName = folderName.length > 10 ? folderName.substring(0, 10) + "..." : folderName;
    
    function handleFolderClick() {
        setCurrFolderID(folderID)
        updateFolders([...folders, { name: folderName, id: folderID }])
    }

    return (
        <button onClick={handleFolderClick} className="btn btn-ghost w-40 h-15 bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FolderIcon className="w-5 h-5 text-slate-100" />
            <span className="font-large">{trimmedFolderName}</span>
        </button>
    )
}
