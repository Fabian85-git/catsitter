"use client"

import Link from "next/link"

import type React from "react"
import { marketplaceItems } from "@/lib/marketplace-data"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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

export default function MarktplatzPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const filteredItems = marketplaceItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (!value.trim()) {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
  }

  const goBack = () => {
    setIsSearching(false)
    setSearchQuery("")
  }

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

        <form onSubmit={handleSearch} className="relative mb-6 flex items-center gap-2">
          {isSearching && (
            <Button type="button" variant="ghost" size="icon" onClick={goBack} className="flex-shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Suche e.g. Katzenklo, Spielzeug"
              className="pl-10 pr-10 h-12 rounded-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>

        {isSearching && searchQuery ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Suchergebnisse für "{searchQuery}" ({filteredItems.length})
            </h2>

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
                          <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                          <p className="text-lg font-bold text-[#5682D3] mb-2">CHF {item.price}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="line-clamp-1">{item.seller}</span>
                            <span>•</span>
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
                <p className="text-muted-foreground">Keine Artikel gefunden für "{searchQuery}"</p>
                <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                  Suche zurücksetzen
                </Button>
              </Card>
            )}
          </div>
        ) : (
          <>
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
                <Card
                  key={category.id}
                  onClick={() => router.push(`/marktplatz/${category.slug}`)}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer shadow-none p-0"
                >
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
              ))}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
