export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="w-10 h-10 bg-muted rounded animate-pulse" />
          <div className="w-32 h-6 bg-muted rounded animate-pulse" />
          <div className="w-10 h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <main className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
        <div className="h-32 bg-muted rounded-lg animate-pulse" />
        <div className="h-48 bg-muted rounded-lg animate-pulse" />
        <div className="h-32 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-lg animate-pulse" />
      </main>
    </div>
  )
}
