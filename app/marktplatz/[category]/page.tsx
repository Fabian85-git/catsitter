import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Sample products data
  const products = [
    {
      id: 1,
      title: "Kratzbaum XXL",
      price: "CHF 120",
      location: "Zürich, 2km entfernt",
      image: "/cat-scratching-post.png",
      seller: "Maria K.",
    },
    {
      id: 2,
      title: "Katzenfutter Paket",
      price: "CHF 45",
      location: "Zürich, 3km entfernt",
      image: "/cat-food-packages.jpg",
      seller: "Thomas B.",
    },
    {
      id: 3,
      title: "Katzenspielzeug Set",
      price: "CHF 25",
      location: "Zürich, 1.5km entfernt",
      image: "/cat-toys-set.jpg",
      seller: "Sandra M.",
    },
    {
      id: 4,
      title: "Transportbox",
      price: "CHF 35",
      location: "Zürich, 4km entfernt",
      image: "/cat-carrier-box.jpg",
      seller: "Peter L.",
    },
    {
      id: 5,
      title: "Katzenbett Premium",
      price: "CHF 60",
      location: "Zürich, 2.5km entfernt",
      image: "/cat-bed-premium.jpg",
      seller: "Anna W.",
    },
    {
      id: 6,
      title: "Futternapf Set",
      price: "CHF 15",
      location: "Zürich, 3.5km entfernt",
      image: "/cat-food-bowls.jpg",
      seller: "Michael R.",
    },
  ]

  // Get category title from slug
  const categoryTitles: Record<string, string> = {
    katzenfutter: "Katzenfutter",
    spielmaeuse: "Spielmäuse",
    "pflege-hygiene": "Pflege & Hygiene",
    "interaktive-spielzeuge": "Interaktive Spielzeuge",
    "alle-spielzeuge": "Alle Spielzeuge",
  }

  const categoryTitle = categoryTitles[params.category] || "Kategorie"

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href="/marktplatz">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{categoryTitle}</h1>
        </div>
      </div>

      <main className="px-4 py-4 max-w-screen-xl mx-auto">
        {/* Advertising Banner */}
        <Card className="mb-6 overflow-hidden bg-gradient-to-r from-orange-400 to-pink-500">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm font-bold">20% Rabatt auf alle Katzenprodukte!</p>
              <p className="text-xs">Nur diese Woche bei PetShop Zürich</p>
            </div>
            <Button size="sm" variant="secondary" className="text-xs">
              Mehr Info
            </Button>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-base mb-1">{product.title}</h3>
                <p className="text-lg font-bold text-primary mb-2">{product.price}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{product.location}</span>
                </div>
                <p className="text-xs text-muted-foreground">von {product.seller}</p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
