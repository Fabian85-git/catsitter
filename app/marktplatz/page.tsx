import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function MarktplatzPage() {
  const categories = [
    {
      id: 1,
      title: "Katzenfutter",
      image: "/cat-food-bowls.jpg",
      slug: "katzenfutter",
    },
    {
      id: 2,
      title: "Spielmäuse",
      image: "/playful-cat.png",
      slug: "spielmaeuse",
    },
    {
      id: 3,
      title: "Pflege & Hygiene",
      image: "/cat-grooming.png",
      slug: "pflege-hygiene",
    },
    {
      id: 4,
      title: "Interaktive Spielzeuge",
      image: "/cat-interactive-toys.jpg",
      slug: "interaktive-spielzeuge",
    },
    {
      id: 5,
      title: "Alle Spielzeuge",
      image: "/cat-with-leash.jpg",
      slug: "alle-spielzeuge",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Marktplatz</h1>
          <Link href="/marktplatz/meine-artikel">
            <Button variant="ghost" className="gap-2">
              <ChevronRight className="w-5 h-5" />
              Verkaufen
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Suche e.g. Katzenklo, Spielzeug" className="pl-10 h-12 rounded-full" />
        </div>

        {/* Banner Ad */}
        <Card className="mb-6 overflow-hidden bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/tabby-cat-sunbeam.png" alt="Cat" className="w-20 h-20 rounded-lg object-cover" />
              <div className="text-white">
                <div className="bg-white px-3 py-1 rounded inline-block mb-2">
                  <span className="text-red-600 font-bold">PURINA</span>
                  <span className="font-bold ml-1">ONE</span>
                </div>
                <p className="text-sm font-medium">Visible Health for Today and Tomorrow</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/marktplatz/${category.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{category.title}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
