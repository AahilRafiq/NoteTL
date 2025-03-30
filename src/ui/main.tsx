import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {HashRouter} from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <main className='dark text-white bg-gray-950'>
        <App />
        <Toaster/>
      </main>
    </HashRouter>
  </StrictMode>,
)
