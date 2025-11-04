import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function MeineArtikelPage() {
  const myListings = [
    {
      id: 1,
      title: "Kratzbaum wie neu",
      price: 85,
      image: "/cat-scratching-post.png",
      category: "Kratzbäume",
      status: "active",
      views: 24,
      createdAt: "vor 3 Tagen",
    },
    {
      id: 2,
      title: "Interaktives Spielzeug Set",
      price: 25,
      image: "/cat-toys-set.jpg",
      category: "Spielzeuge",
      status: "active",
      views: 12,
      createdAt: "vor 1 Woche",
    },
    {
      id: 3,
      title: "Transportbox mittelgross",
      price: 45,
      image: "/cat-carrier-box.jpg",
      category: "Transportboxen",
      status: "active",
      views: 8,
      createdAt: "vor 2 Wochen",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 px-4 py-4 max-w-screen-xl mx-auto">
          <Link href="/marktplatz">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Meine Artikel</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Add New Item Button */}
        <Link href="/marktplatz/verkaufen">
          <Button className="w-full h-12 mb-6 gap-2">
            <Plus className="w-5 h-5" />
            Neuer Artikel erfassen
          </Button>
        </Link>

        {/* Link to Sold Items */}
        <Link href="/marktplatz/verkauft">
          <Card className="p-4 mb-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <span className="font-medium">Bereits verkaufte Artikel</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        {/* Active Listings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Aktive Inserate ({myListings.length})</h2>

          {myListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                    <Badge variant="secondary" className="flex-shrink-0">
                      Aktiv
                    </Badge>
                  </div>

                  <p className="text-lg font-bold text-primary mb-1">CHF {listing.price}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{listing.views} Aufrufe</span>
                    <span>•</span>
                    <span>{listing.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t px-4 py-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Bearbeiten
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Als verkauft markieren
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
