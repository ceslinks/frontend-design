import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Student Activities Portal
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Hello, Jordan.
        </h1>
        <p className="text-muted-foreground">
          Vite + React + TypeScript + Tailwind v4 + shadcn/ui is wired up. The
          five-tab portal builds on top of this.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button>Get started</Button>
          <Button variant="outline">View prototype</Button>
        </div>
      </div>
    </main>
  )
}

export default App
