import { useState, useEffect } from "react"
import NewFileModal from "@/components/filesys/NewFileModal"
import NewFolderModal from "@/components/filesys/NewFolderModal"
import File from "@/components/filesys/File"
import Folder from "@/components/filesys/Folder"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import { useTransition } from "react"
import FullScreenLoader from "@/components/FullScreenLoader"
import { useFolderNavStore } from "@/zustand/folderNavStore"
import BreadCrumbsFull from "@/components/breadcrumbs/BreadCrumbsFull"


interface Contents {
  files: { name: string, id: number }[],
  folders: { name: string, id: number }[]
}

export default function () {
  const [contents, setContents] = useState<Contents>(null)
  const currFolderID = useFolderNavStore(state => state.currFolderID)
  const setDefault = useFolderNavStore(state => state.setDefault)
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
    <div className="flex flex-col h-screen">
      <header className="p-4 flex items-center justify-between">
        <BreadCrumbsFull/>
        <div className="flex items-center gap-4">

          {/* Menu Buttons */}
          <Button onClick={setDefault} variant="ghost" size="lg">
            <HomeIcon className="min-w-5 min-h-5"/>
          </Button>
          <NewFolderModal refreshContents={refreshContents} parentFolderID={currFolderID} />
          <NewFileModal refreshContents={refreshContents} parentFolderID={currFolderID} />

        </div>
      </header>

      {/* Files/Folders */}

      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-wrap gap-4">

          {contents?.folders.map(folder => (
            <div key={folder.id} className="flex-none">
                <Folder folderName={folder.name} folderID={folder.id} refreshContents={refreshContents} />
            </div>
          ))}

          {contents?.files.map(file => (
            <div key={file.id} className="flex-none">
              <File fileName={file.name} fileID={file.id} refreshContents={refreshContents} />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
