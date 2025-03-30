type FolderContents = {
    folders: {
        id: number
        name: string
    }[],
    files: {
        id: number,
        name: string
    }[]
}

interface Window {
    api: {
        getFolderContents: (parentID: number) => Promise<ApiResponse<FolderContents>>,
        createNewFolder: (name: string, parentID: number) => Promise<ApiResponse<void>>,
        createNewFile: (name: string, parentID: number) => Promise<ApiResponse<void>>,
        saveFile: (fileID: number, data: string) => Promise<ApiResponse<void>>,
        getFileData: (fileID: number) => Promise<ApiResponse<string>>,
        isNewUser: () => Promise<ApiResponse<boolean>>,
        initNew: () => Promise<ApiResponse<void>>,
        deleteFile: (fileID: number) => Promise<ApiResponse<void>>,
        deleteFolder: (folderID: number) => Promise<ApiResponse<void>>,
        renameFile: (fileID: number, newName: string) => Promise<ApiResponse<void>>,
        renameFolder: (folderID: number, newName: string) => Promise<ApiResponse<void>>
    }
}

interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
}
