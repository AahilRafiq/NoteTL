interface Window {
    api: {
        filelist: (currdir: string) => Promise<ApiResponse<{name: string, isDirectory: boolean}[]>>
        createDir: (currdir: string) => Promise<ApiResponse<void>>,
        isFirstTime: () => Promise<ApiResponse<boolean>>,
        updatePath: () => void
    }
}

interface ApiResponse<T> {
    success: boolean
    message?: string
    data?: T
}