interface Window {
    api: {
        filelist: (currdir: string) => Promise<ApiResponse<{name: string, isDirectory: boolean}[]>>
        createDir: (currdir: string) => Promise<ApiResponse<void>>
    }
}

interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
}