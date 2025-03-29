import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface Contents {
  files: { name: string, id: number }[],
  folders: { name: string, id: number }[]
}

export default function () {
  const [contents, setContents] = useState<Contents>(null)
  const [currFolderID, setCurrFolderID] = useState<number>(null)

  async function handleCreateFolder() {
    const name = 'example' + Math.floor(Math.random() * 1000)
    if (!name) return

    const response = await window.api.createNewFolder(name, currFolderID)
    if (!response.success)
      alert("Error creating folder: " + response.message)
  }

  useEffect(() => {
    async function fetchContents() {
      const response = await window.api.getFolderContents(currFolderID)
      if (response.success) {
        setContents(response.data)
      } else {
        alert("Error fetching folder contents: " + response.message)
      }
    }

    fetchContents()
  }, [currFolderID])
  

  return (
    <div>
      <h1>App</h1>
      <Button onClick={handleCreateFolder}>Create Folder</Button>

      {/* a list of folders */}
      <div>
        <h2>Folders</h2>
        {contents?.folders.map((folder) => (
          <div key={folder.id} onClick={() => setCurrFolderID(folder.id)}>
            {folder.name}
          </div>
        ))}
      </div>
    </div>
  )
}