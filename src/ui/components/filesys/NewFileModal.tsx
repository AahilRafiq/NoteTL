import { useState } from "react";
import { toast } from "sonner";
import FullScreenLoader from "../FullScreenLoader";
import { FilePlusIcon } from "lucide-react";

interface IProps {
    parentFolderID: number,
    refreshContents?: () => void
}

export default function ({ parentFolderID , refreshContents}: IProps) {

    const [fileName, setFileName] = useState("")
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleCreateFile() {
        const pfid = parentFolderID === 0 ? null : parentFolderID
        setLoading(true)
        const res = await window.api.createNewFile(fileName, pfid)
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
                <FilePlusIcon className="w-6 h-6" />
                <span className="sr-only">New File</span>
            </button>
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <div className="modal-header">
                            <span>Enter File Name</span>
                        </div>
                        <div className="modal-body">
                            <input onChange={e => setFileName(e.target.value)} placeholder="File Name" className="input input-bordered w-full" />
                        </div>
                        <div className="modal-action">
                            <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            <button onClick={handleCreateFile} className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
