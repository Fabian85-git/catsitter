export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="px-4 py-4">
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
      </div>
      <main className="px-4 max-w-screen-xl mx-auto">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
        <div className="h-5 w-64 bg-muted rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
