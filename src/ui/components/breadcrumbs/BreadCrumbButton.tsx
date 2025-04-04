import { Button } from "../ui/button";
import { useFolderNavStore } from "@/zustand/folderNavStore";
import { useNavigate } from "react-router-dom";

export default function BreadCrumbItem({ name, id }: { name: string; id: number }) {

    const folders = useFolderNavStore(state => state.folders)
    const setCurrFolderID = useFolderNavStore(state => state.setCurrFolderID)
    const updateFolders = useFolderNavStore(state => state.updateFolders)
    const navigate = useNavigate()

    function handleClick() {
        const updatedFolders: typeof folders = []
        for(const folder of folders) {
            updatedFolders.push(folder)
            if(folder.id === id) {
                break
            }
        }

        updateFolders(updatedFolders)
        setCurrFolderID(id)
        navigate(`/dashboard`)
    }

    return (
        <Button onClick={handleClick} className="p-2 text-lg" variant="ghost">{name}</Button>
    );
}