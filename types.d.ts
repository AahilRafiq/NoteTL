interface Window {
    api: {
        filelist: (currdir: string) => Promise<ApiResponse<{name: string, isDirectory: boolean}[]>>
        createDir: (currdir: string) => Promise<ApiResponse<void>>,
        isNewUser: () => Promise<ApiResponse<boolean>>,
        initNew: () => Promise<ApiResponse<void>>
    }
}

interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
}