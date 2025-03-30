import { useState, useEffect } from "react"
import NewFileModal from "@/components/filesys/NewFileModal"
import NewFolderModal from "@/components/filesys/NewFolderModal"
import File from "@/components/filesys/File"
import Folder from "@/components/filesys/Folder"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import { useTransition } from "react"
import FullScreenLoader from "@/components/FullScreenLoader"

interface Contents {
  files: { name: string, id: number }[],
  folders: { name: string, id: number }[]
}

export default function () {
  const [contents, setContents] = useState<Contents>(null)
  const [currFolderID, setCurrFolderID] = useState<number>(null)
  const [isPending, startTransition] = useTransition()


  useEffect(() => {
    startTransition(async () => {
      const response = await window.api.getFolderContents(currFolderID)
      if (response.success) {
        setContents(response.data)
      } else {
        alert("Error fetching folder contents: " + response.message)
      }
    })
  }, [currFolderID])

  async function refreshContents() {
    startTransition(async () => {
      const response = await window.api.getFolderContents(currFolderID)
      if (response.success) {
        setContents(response.data)
      } else {
        alert("Error fetching folder contents: " + response.message)
      }
    })
  }

  if (isPending) {
    return <FullScreenLoader />
  }
  return (
    <div className="flex flex-col h-screen p-5">
            
            <header className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 dark">

                    {/* Menu Buttons */}
                    <Button onClick={()=>window.location.reload()} variant="ghost" size="default">
                            <HomeIcon className="w-12 h-12" />
                      </Button>
                    <NewFolderModal refreshContents={refreshContents} parentFolderID={currFolderID}/>
                    <NewFileModal refreshContents={refreshContents} parentFolderID={currFolderID}/>

                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Filter</span>
                    </Button>
                </div>
            </header>

            {/* Files/Folders */}

            <div className="flex-1 overflow-auto p-4">
                <div className="flex flex-wrap gap-4">
                    
                    {contents?.folders.map(folder => (
                        <div key={folder.id} className="flex-none">
                            <Button 
                                onClick={() => setCurrFolderID(folder.id)} 
                                variant="ghost" 
                                className="p-0 h-auto w-auto"
                            >
                                <Folder folderName={folder.name} />
                            </Button>
                        </div>
                    ))}

                    {contents?.files.map(file => (
                        <div key={file.id} className="flex-none">
                            <File fileName={file.name} fileID={file.id} />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
  )
}