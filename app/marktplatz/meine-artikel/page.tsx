"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function MeineArtikelPage() {
  const router = useRouter()
  const [showNewItemDialog, setShowNewItemDialog] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  })

  const soldListings = [
    {
      id: 101,
      title: "Katzenbett rund",
      price: 35,
      image: "/cat-bed.jpg",
      category: "Katzenbetten",
      soldDate: "vor 5 Tagen",
    },
    {
      id: 102,
      title: "Futternapf Set",
      price: 15,
      image: "/cat-food-bowls.jpg",
      category: "Näpfe",
      soldDate: "vor 2 Wochen",
    },
  ]

  const [myListings, setMyListings] = useState([
    {
      id: 1,
      title: "Kratzbaum wie neu",
      price: 85,
      image: "/cat-with-leash.jpg",
      category: "Kratzbäume",
      status: "active",
      views: 24,
      createdAt: "vor 3 Tagen",
    },
    {
      id: 2,
      title: "Interaktives Spielzeug Set",
      price: 25,
      image: "/cat-interactive-toys.jpg",
      category: "Spielzeuge",
      status: "active",
      views: 12,
      createdAt: "vor 1 Woche",
    },
    {
      id: 3,
      title: "Transportbox mittelgross",
      price: 45,
      image: "/playful-cat.png",
      category: "Transportboxen",
      status: "active",
      views: 8,
      createdAt: "vor 2 Wochen",
    },
  ])

  const handleCreateItem = () => {
    if (newItem.title && newItem.price && newItem.category) {
      const newListing = {
        id: Date.now(),
        title: newItem.title,
        price: Number.parseFloat(newItem.price),
        image: "/placeholder.svg?height=100&width=100",
        category: newItem.category,
        status: "active" as const,
        views: 0,
        createdAt: "Gerade eben",
      }
      setMyListings([newListing, ...myListings])
      setNewItem({ title: "", price: "", category: "", description: "" })
      setShowNewItemDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 px-4 py-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.push("/marktplatz")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Meine Artikel</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <Button className="w-full h-12 mb-3 gap-2" onClick={() => setShowNewItemDialog(true)}>
          <Plus className="w-5 h-5" />
          Neuer Artikel erfassen
        </Button>

        {soldListings.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Bereits verkaufte Artikel</h3>
            <div className="space-y-2">
              {soldListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden opacity-60">
                  <div className="flex gap-3 p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                      <p className="text-sm font-semibold text-primary">CHF {listing.price}</p>
                      <p className="text-xs text-muted-foreground">Verkauft {listing.soldDate}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="border-t my-6" />

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

      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neuer Artikel erfassen</DialogTitle>
            <DialogDescription>Erstelle ein neues Inserat für den Marktplatz</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                placeholder="z.B. Kratzbaum wie neu"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preis (CHF)</Label>
              <Input
                id="price"
                type="number"
                placeholder="25.00"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Input
                id="category"
                placeholder="z.B. Spielzeuge"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                placeholder="Beschreibe deinen Artikel..."
                rows={4}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewItemDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleCreateItem}>Artikel erstellen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
