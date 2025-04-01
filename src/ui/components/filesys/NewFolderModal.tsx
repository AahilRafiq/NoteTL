import { useState } from "react";
import { toast } from "sonner";
import { Button, Modal, Input } from "daisyui";
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
            <Button onClick={() => setIsModalOpen(true)} variant="ghost" size="icon">
                <FolderPlusIcon className="w-6 h-6" />
                <span className="sr-only">New Folder</span>
            </Button>
            <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)}>
                <Modal.Header>
                    <span>Enter Folder Name</span>
                </Modal.Header>
                <Modal.Body>
                    <Input onChange={e => setFolderName(e.target.value)} placeholder="Folder Name" />
                </Modal.Body>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateFolder}>Create</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
