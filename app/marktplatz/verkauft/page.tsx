import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerkauftPage() {
  const soldListings = [
    {
      id: 1,
      title: "Katzenbett Premium",
      price: 65,
      image: "/cat-bed-premium.jpg",
      category: "Katzenbetten",
      soldDate: "vor 2 Tagen",
      soldPrice: 65,
    },
    {
      id: 2,
      title: "Futternäpfe Set",
      price: 20,
      image: "/cat-food-bowls.jpg",
      category: "Näpfe & Tränken",
      soldDate: "vor 1 Woche",
      soldPrice: 18,
    },
    {
      id: 3,
      title: "Katzenfutter Paket",
      price: 35,
      image: "/cat-food-packages.jpg",
      category: "Katzenfutter",
      soldDate: "vor 2 Wochen",
      soldPrice: 30,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 px-4 py-4 max-w-screen-xl mx-auto">
          <Link href="/marktplatz/meine-artikel">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Verkaufte Artikel</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Verkaufte Artikel ({soldListings.length})</h2>
            <p className="text-sm text-muted-foreground">
              Gesamt: CHF {soldListings.reduce((sum, item) => sum + item.soldPrice, 0)}
            </p>
          </div>

          {soldListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{listing.title}</h3>
                    <Badge variant="secondary" className="flex-shrink-0 bg-green-100 text-green-700">
                      Verkauft
                    </Badge>
                  </div>

                  <p className="text-lg font-bold text-primary mb-1">CHF {listing.soldPrice}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Verkauft {listing.soldDate}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {soldListings.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Noch keine verkauften Artikel</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
