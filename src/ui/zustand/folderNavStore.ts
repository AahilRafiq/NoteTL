import { create } from "zustand";

interface Folder {
    name: string;
    id: number;
}

interface FolderNavStore {
    folders: Folder[];
    currFolderID: number | null;
    updateFolders: (folders: Folder[]) => void;
    setDefault: () => void;
    setCurrFolderID: (id: number | null) => void;
}

export const useFolderNavStore = create<FolderNavStore>((set) => ({
    folders: [{ name: "Home", id: null }],
    currFolderID: null,
    setCurrFolderID: (id) => set({ currFolderID: id }),
    setDefault: () => set({ folders: [{ name: "Home", id: null }], currFolderID: null }),
    updateFolders: (folders) => set({ folders }),
}));
