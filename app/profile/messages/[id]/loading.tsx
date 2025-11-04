export default function ChatLoading() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <div className="w-6 h-6 mr-2 bg-muted animate-pulse rounded" />
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-32 ml-3 bg-muted animate-pulse rounded" />
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
            <div className="w-48 h-16 bg-muted animate-pulse rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
