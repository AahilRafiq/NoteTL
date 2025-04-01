import { useState } from "react";
import { toast } from "sonner";
import FullScreenLoader from "../FullScreenLoader";
import { FolderPlusIcon } from "lucide-react";

interface IProps {
    parentFolderID: number,
    refreshContents?: () => void
}

export default function ({ parentFolderID , refreshContents}: IProps) {

    const [folderName, setFolderName] = useState("")
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleCreateFolder() {
        const pfid = parentFolderID === 0 ? null : parentFolderID
        setLoading(true)
        const res = await window.api.createNewFolder(folderName, pfid)
        setLoading(false)
        if (res.success) {
            refreshContents()
            setIsModalOpen(false);
        } else {
            toast.error(res.message)
        }
    }

    if (loading) {
        return <FullScreenLoader />
    }
    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-ghost btn-icon">
                <FolderPlusIcon className="w-6 h-6" />
                <span className="sr-only">New Folder</span>
            </button>
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <div className="modal-header">
                            <span>Enter Folder Name</span>
                        </div>
                        <div className="modal-body">
                            <input onChange={e => setFolderName(e.target.value)} placeholder="Folder Name" className="input input-bordered w-full" />
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            <button onClick={handleCreateFolder} className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
