"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, List, Map, MapPin, Star, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState, useEffect } from "react"
import { MapView } from "@/components/map-view"

const catOwners = [
  {
    id: "sandra",
    name: "Sandra",
    distance: "60m entfernt",
    street: "Norastrastrasse",
    cats: "Bionda & Blanca",
    image: "/orange-tabby-cat.jpg",
    type: "tausch" as const,
    lat: 47.3769,
    lng: 8.5417,
  },
  {
    id: "tommy",
    name: "Tommy",
    distance: "90m entfernt",
    street: "Norastrastrasse",
    cats: "Jesus",
    image: "/grey-white-cat.jpg",
    type: "bezahlt" as const,
    price: 45,
    lat: 47.3775,
    lng: 8.542,
  },
  {
    id: "anna-kim",
    name: "Anna & Kim",
    distance: "120m entfernt",
    street: "Badenerstrasse",
    cats: "Joe & Zen",
    image: "/smiling-brown-haired-woman.png",
    type: "tausch" as const,
    lat: 47.378,
    lng: 8.541,
  },
  {
    id: "charly",
    name: "Charly",
    distance: "210m entfernt",
    street: "Badenerstrasse",
    cats: "Tom, Speedy & Sylvester",
    image: "/dark-haired-man.png",
    type: "bezahlt" as const,
    price: 50,
    lat: 47.379,
    lng: 8.5425,
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    distance: "230m entfernt",
    street: "Badenerstrasse",
    cats: "Joe & Zen",
    image: "/fluffy-persian-cat.jpg",
    type: "tausch" as const,
    lat: 47.3795,
    lng: 8.543,
  },
]

export default function ConnectPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedOwner, setSelectedOwner] = useState<any>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    if (!selectedOwner) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      const scrollPosition = target.scrollLeft
      const photoWidth = target.offsetWidth
      const index = Math.round(scrollPosition / photoWidth)
      setCurrentPhotoIndex(index)
    }

    const photoGallery = document.getElementById("connect-photo-gallery")
    if (photoGallery) {
      photoGallery.addEventListener("scroll", handleScroll)
      return () => photoGallery.removeEventListener("scroll", handleScroll)
    }
  }, [selectedOwner])

  const handleMapMarkerClick = (owner: any) => {
    setSelectedOwner(owner)
    setIsSheetOpen(true)
    setCurrentPhotoIndex(0)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="px-4 py-4">
          <Button variant="ghost" size="icon" className="mb-4" onClick={() => router.push("/sitter")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex justify-between mb-4 flex-row items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">Finde Miauzlovers in deiner Nähe</h1>
              <p className="text-sm text-muted-foreground">
                Verbinde dich mit Katzenhalter:innen. Es muss nicht gleich für einen festen Termin sein.
              </p>
            </div>
            <div className="flex border rounded-lg overflow-hidden ml-4 flex-shrink-0">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("map")}
              >
                <Map className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4">
        {viewMode === "list" ? (
          <div className="divide-y">
            {catOwners.map((owner) => (
              <div
                key={owner.id}
                onClick={() => router.push(`/sitter/connect/${owner.id}`)}
                className="py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer -mx-4 px-4"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={owner.image || "/placeholder.svg"} alt={owner.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{owner.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#5682D3] text-white font-medium flex-shrink-0">
                      {owner.type === "tausch" ? "Tausch" : "Bezahlt"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{owner.distance}</p>
                  <p className="text-sm text-muted-foreground">{owner.street}</p>
                  <p className="text-sm">
                    <span className="mr-1">🐱</span>
                    {owner.cats}
                  </p>
                </div>
                <ChevronLeft className="w-6 h-6 rotate-180 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[calc(100vh-240px)] -mx-4">
            <MapView
              markers={catOwners.map((owner) => ({
                sitter: {
                  id: owner.id,
                  name: owner.name,
                  avatar: owner.image,
                  location: owner.distance,
                  bio: `${owner.cats} - ${owner.street}`,
                  fullBio: `Ich bin ${owner.name} und habe ${owner.cats}. Ich wohne an der ${owner.street}.`,
                  rating: 4.8,
                  reviewCount: 23,
                  cats: [{ name: owner.cats, breed: "", age: "", image: owner.image }],
                  type: owner.type,
                  price1Visit: owner.type === "bezahlt" ? owner.price : undefined,
                  photos: [owner.image, owner.image],
                  paymentType: owner.type,
                } as any,
                lat: owner.lat,
                lng: owner.lng,
              }))}
              onMarkerClick={handleMapMarkerClick}
            />
          </div>
        )}
      </main>

      {selectedOwner && isSheetOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSheetOpen(false)} />

          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsSheetOpen(false)}
                className="rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="relative">
                <div
                  id="connect-photo-gallery"
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none" }}
                >
                  {selectedOwner.photos.map((photo: string, index: number) => (
                    <div key={index} className="flex-shrink-0 w-full snap-center">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`${selectedOwner.name} photo ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentPhotoIndex + 1}/{selectedOwner.photos.length}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{selectedOwner.name}</h2>
                    <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">
                      {selectedOwner.paymentType === "tausch" ? "Tausch" : "Bezahlt"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedOwner.rating}</span>
                    <span className="text-sm">({selectedOwner.reviewCount} Bewertungen)</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Über mich</h3>
                  <p className="text-muted-foreground">{selectedOwner.fullBio || selectedOwner.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Standort</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedOwner.location}</span>
                  </div>
                </div>

                {selectedOwner.cats && selectedOwner.cats.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Katzen</h3>
                    <div className="flex gap-4">
                      {selectedOwner.cats.map((cat: any, index: number) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <img
                            src={cat.image || "/placeholder.svg"}
                            alt={cat.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsSheetOpen(false)
                    router.push(`/sitter/connect/${selectedOwner.id}`)
                  }}
                  className="w-full bg-[#5682D3] hover:bg-[#4571C2] text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Kontaktieren
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
