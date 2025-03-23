import { useState, useEffect } from "react"
import WelcomePage from "@/pages/Welcome"
import Main from "@/pages/Main"

export default function() {

  const [loading, setLoading] = useState(true)
  const [isFirstTime, setIsFirstTime] = useState(true)

  useEffect(() => {
    checkFirstTime()
  },[])

  async function checkFirstTime() {
    const res = await window.api.isFirstTime()
    if(res.success) {
      setIsFirstTime(res.data)
    }
    setLoading(false)
  }

  if(loading) {
    return <div>Loading...</div>
  }
  return(
    isFirstTime ? <WelcomePage /> : <Main />
  )
}