import { Button } from "./components/ui/button"
import { useState, useEffect } from "react"

export default function() {
  const [dirs, setDirs] = useState<string[]>([])
  const [files, setFiles] = useState<{name: string, isDirectory: boolean}[]>([])

  useEffect(() => {
    const relativePath = dirs.join('/')
    window.api.filelist(relativePath).then((res) => {
      if (res.success) {
        setFiles(res.data)
      }
    })
  }, [dirs])

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.textContent
    const file = files.find((file) => file.name === name)
    if(!file.isDirectory) {
      alert('Not a directory')
      return
    }
    setDirs([...dirs,file.name])
  }

  const handleGoBack = () => {
    setDirs(dirs.slice(0,-1))
  }

  return(
    <div>
      <h1>App</h1>
      <Button onClick={handleGoBack}>Go back</Button>
      
      {/* a list of folders */}
      <ul>
        {files.map((dir) => <li>
          <button key={dir.name} onClick={handleClick}>{dir.name}</button>
        </li>)}
      </ul>
    </div>
  )
}