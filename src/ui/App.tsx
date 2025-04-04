import { useEffect, useTransition } from "react";
import WelcomePage from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import FullScreenLoader from "./components/FullScreenLoader";
import Editor from "./pages/Editor";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  const [isPending, startTransition] = useTransition();
  const router = useNavigate();

  useEffect(() => {
    startTransition(async () => {
      const res = await window.api.isNewUser();
      if (res.success && res.data == false) {
          router("/dashboard");
        }
      }
    )
  }, []);

  if (isPending) {
    return <FullScreenLoader/>;
  }

  return (
    <main className="dark">
      <div className="dark:bg-gray-950 dark:text-white">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:editorID" element={<Editor />} />
        </Routes>
      </div>
    </main>
  )

}
