import { ArrowRight, FileText, Cloud, Pencil } from 'lucide-react';

export default function WelcomePage() {
  async function handleGetStarted() {
    try {
      const res = await window.api.initNew()
      if (res.success) {
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <Pencil className="h-10 w-10 text-indigo-600" />
            <FileText className="h-12 w-12 text-indigo-500 ml-1" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">NoteTL</h1>
          <p className="text-lg text-slate-600">A tldraw based notes and organizer</p>
        </div>

        {/* Main Card */}
        <div className="card shadow-lg border-slate-200">
          <div className="card-header text-center">
            <h2 className="card-title text-2xl">Welcome to NoteTL</h2>
            <p className="card-description">
              Create, organize, and visualize your notes with our tldraw-powered workspace
            </p>
          </div>
          <div className="card-body space-y-4">
            <button onClick={handleGetStarted} className="btn btn-primary w-full py-6 text-lg">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="card-footer flex flex-col space-y-4 border-t pt-4">
            <div className="flex items-center justify-center w-full text-slate-500 text-sm">
              <Cloud className="h-4 w-4 mr-1" />
              Your data is stored locally
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>NoteTL v1.0.0 • Made with ❤️</p>
        </div>
      </div>
    </div>
  );
}
