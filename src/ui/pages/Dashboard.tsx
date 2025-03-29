import React, { useState, useEffect } from "react"

interface Contents {
  files: { name: string, id: number }[],
  folders: { name: string, id: number }[]
}

export default function () {
  const [contents, setContents] = useState<Contents>(null)
  const [newFolderName, setNewFolderName] = useState<string>("")
  const [currFolderID, setCurrFolderID] = useState<number>(null)

  async function handleCreateFolder(e: React.FormEvent) {
    e.preventDefault()
    if (!newFolderName) return

    const response = await window.api.createNewFolder(newFolderName, currFolderID)
    if (!response.success)
      alert("Error creating folder: " + response.message)

    const res = await window.api.getFolderContents(currFolderID)
      if (res.success) {
        setContents(res.data)
      } else {
        alert("Error fetching folder contents: " + res.message)
      }
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
      <input onChange={(e) => setNewFolderName(e.target.value)} type="text"></input>
      <button onClick={handleCreateFolder}>Create Folder</button>

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