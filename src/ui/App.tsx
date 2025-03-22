import { Button } from "./components/ui/button"

export default function() {

  const handleClick = async () => {
    //@ts-ignorets-ignore
    const res = await window.api.hello()
    alert(res)
  }

  return(
    <div>
      <h1>App</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}