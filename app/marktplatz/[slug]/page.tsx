"use client"

import { useParams, useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, User } from "lucide-react"
import { marketplaceItems, categoryMap } from "@/lib/marketplace-data"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const categoryTitle = categoryMap[slug] || slug

  const filteredItems = marketplaceItems.filter((item) => item.category === categoryTitle)

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/marktplatz/artikel/${item.id}`)}
                className="cursor-pointer"
              >
                <Card className="hover:shadow-lg transition-shadow shadow-none p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="font-semibold text-base mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-lg font-bold text-[#5682D3] mb-2">CHF {item.price}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span className="line-clamp-1">{item.seller}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Keine Artikel in dieser Kategorie gefunden</p>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
