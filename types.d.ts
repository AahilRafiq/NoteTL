interface Window {
    api: {
        getFolderContents: (parentID: number) => Promise<ApiResponse<{folders: {name: string, id: number}[], files: {name: string, id: number}[]}>>,
        createNewFolder: (name: string, parentID: number) => Promise<ApiResponse<void>>,
        isNewUser: () => Promise<ApiResponse<boolean>>,
        initNew: () => Promise<ApiResponse<void>>
    }
}

interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
}