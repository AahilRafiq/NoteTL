import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface Contents {
  files: { name: string, id: number }[],
  folders: { name: string, id: number }[]
}

export default function () {
  const [contents, setContents] = useState<Contents>(null)
  const [newFolderName, setNewFolderName] = useState<string>("")
  const [newFileName, setNewFileName] = useState<string>("")
  const [currFolderID, setCurrFolderID] = useState<number>(null)

  async function handleCreateFolder() {
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

  async function handleCreateFile() {
    if (!newFileName) return

    const response = await window.api.createNewFile(newFileName, currFolderID)
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

      {/* a list of contents */}
      <div>
        <h2>Folders</h2>
        {contents?.folders.map((folder) => (
          <div key={folder.id} onClick={() => setCurrFolderID(folder.id)}>
            {folder.name}
          </div>
        ))}
        <br></br>
        <input onChange={(e) => setNewFileName(e.target.value)} type="text"></input>
      <button onClick={handleCreateFile}>Create File</button>
        <h2>Files</h2>
        {contents?.files.map((file) => (
          <div>
          <Link to={`/editor/${file.id}`} key={file.id} onClick={() => setCurrFolderID(file.id)}>
            {file.name}
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}