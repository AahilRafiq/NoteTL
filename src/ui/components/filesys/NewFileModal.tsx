import { useState } from "react";
import { toast } from "sonner";
import { Button, Modal, Input } from "daisyui";
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
            <Button onClick={() => setIsModalOpen(true)} variant="ghost" size="icon">
                <FilePlusIcon className="w-6 h-6" />
                <span className="sr-only">New File</span>
            </Button>
            <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)}>
                <Modal.Header>
                    <span>Enter File Name</span>
                </Modal.Header>
                <Modal.Body>
                    <Input onChange={e => setFileName(e.target.value)} placeholder="File Name" />
                </Modal.Body>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateFile}>Create</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
