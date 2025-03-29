export default function() {
    return(
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <img src="/logo.png" alt="Logo" className="mb-4" />
                <div className="loader"></div>
                <p className="mt-4 text-gray-500">Loading...</p>
            </div>
        </div>
    )
}