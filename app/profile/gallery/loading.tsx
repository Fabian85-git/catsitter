export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <div className="w-6 h-6 rounded bg-muted animate-pulse mr-2" />
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
