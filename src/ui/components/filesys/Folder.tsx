import { FolderIcon } from "lucide-react";

export default function ({ folderName }: { folderName: string }) {

    const trimmedFolderName = folderName.length > 12 ? folderName.substring(0, 12) + "..." : folderName;

    return (
        <button
            className="w-40 h-15 bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <FolderIcon className="w-5 h-5 text-green-400" />
            <span className="font-large">{trimmedFolderName}</span>
        </button>
    )
}