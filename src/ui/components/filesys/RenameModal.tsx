import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FullScreenLoader from "../FullScreenLoader";
import { toast } from "sonner";

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newName: string) => void;
    initialName: string;
}

export default function RenameModal({ isOpen, onClose, onSave, initialName }: RenameModalProps) {
    const [newName, setNewName] = useState(initialName);
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        setLoading(true);
        try {
            await onSave(newName);
            onClose();
        } catch (error) {
            toast.error("Error renaming item");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <FullScreenLoader />;
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Rename Item</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="New Name" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
