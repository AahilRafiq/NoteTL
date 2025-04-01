import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'daisyui';
import { Button } from 'daisyui';
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
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to NoteTL</CardTitle>
            <CardDescription>
              Create, organize, and visualize your notes with our tldraw-powered workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGetStarted} className="w-full py-6 text-lg" size="lg">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="flex items-center justify-center w-full text-slate-500 text-sm">
              <Cloud className="h-4 w-4 mr-1" />
              Your data is stored locally
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>NoteTL v1.0.0 • Made with ❤️</p>
        </div>
      </div>
    </div>
  );
}
