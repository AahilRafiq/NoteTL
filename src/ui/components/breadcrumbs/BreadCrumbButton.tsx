import { useFolderNavStore } from "@/zustand/folderNavStore";

export default function BreadCrumbItem({ name, id }: { name: string; id: number }) {

    const folders = useFolderNavStore(state => state.folders)
    const setCurrFolderID = useFolderNavStore(state => state.setCurrFolderID)
    const updateFolders = useFolderNavStore(state => state.updateFolders)

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
    }

    return (
        <button onClick={handleClick} className="btn btn-ghost p-2">{name}</button>
    );
}
