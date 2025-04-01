import { FileTextIcon } from "lucide-react";
import { Link } from "daisyui";

export default function ({ fileName, fileID }: { fileName: string, fileID: number }) {

    const trimmedFileName = fileName.length > 12 ? fileName.substring(0, 12) + "..." : fileName;

    return (
        <Link to={`/editor/${fileID}`} className="card w-40 h-15 bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FileTextIcon className="w-5 h-5 text-slate-100" />
            <span className="font-large">{trimmedFileName}</span>
        </Link>
    )
}
