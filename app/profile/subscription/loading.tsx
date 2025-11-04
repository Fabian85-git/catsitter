import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionLoading() {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Skeleton className="w-10 h-10 rounded-lg mr-2" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <div className="mb-6 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[500px] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
