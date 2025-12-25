"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, ChevronRight, List, Map, SlidersHorizontal, MapPin, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { findCatsOwners } from "@/lib/find-cats-data"
import { MapView } from "@/components/map-view"

export default function FindCatsPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const router = useRouter()
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

    const photoGallery = document.getElementById("find-cats-photo-gallery")
    if (photoGallery) {
      photoGallery.addEventListener("scroll", handleScroll)
      return () => photoGallery.removeEventListener("scroll", handleScroll)
    }
  }, [selectedOwner])

  const handleMapMarkerClick = (request: any) => {
    setSelectedOwner(request)
    setIsSheetOpen(true)
    setCurrentPhotoIndex(0)
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="px-4 py-4">
          <Link href="/sitter">
            <Button variant="ghost" size="icon" className="mb-4">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>

          <h1 className="text-2xl font-bold mb-6 text-balance">Sei der perfekte Sitter für...</h1>

          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" className="gap-2 border rounded-lg">
              Distanz
              <ChevronRight className="w-4 h-4 rotate-90" />
            </Button>

            <Button variant="ghost" size="icon" className="border rounded-lg">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>

            <div className="ml-auto flex border rounded-lg overflow-hidden">
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
            {findCatsOwners.map((request) => (
              <div
                key={request.id}
                className="py-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors -mx-4 px-4"
                onClick={() => router.push(`/sitter/find-cats/${request.id}`)}
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                  <Image src={request.image || "/placeholder.svg"} alt={request.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xl font-semibold">{request.name}</h3>
                    <span className="bg-[#5682D3] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
                      {request.status}
                    </span>
                  </div>

                  <p className="text-sm text-foreground mb-1">{request.cats}</p>
                  <p className="text-sm text-muted-foreground mb-1">{request.distance}</p>
                  <div className="flex items-center gap-1.5 text-sm text-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Datum: {request.dates}</span>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[calc(100vh-260px)] -mx-4">
            <MapView
              markers={findCatsOwners.map((request, index) => ({
                sitter: {
                  id: request.id,
                  name: request.name,
                  avatar: request.image,
                  location: request.distance,
                  bio: `${request.cats} - ${request.dates}`,
                  fullBio: `Suche nach einem zuverlässigen Sitter für ${request.cats}. ${request.dates}`,
                  rating: 5.0,
                  reviewCount: 12,
                  cats: [{ name: request.cats, breed: "", age: "", image: request.image }],
                  type: request.status === "Anfrage" ? "tausch" : "bezahlt",
                  photos: [request.image, request.image],
                  paymentType: request.status === "Anfrage" ? "tausch" : "bezahlt",
                } as any,
                lat: 47.376888 + (index - 2.5) * 0.003,
                lng: 8.541694 + (index % 2) * 0.004,
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
                  id="find-cats-photo-gallery"
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
                  <h3 className="font-semibold mb-2">Über die Anfrage</h3>
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
                    router.push(`/sitter/find-cats/${selectedOwner.id}`)
                  }}
                  className="w-full bg-[#5682D3] hover:bg-[#4571C2] text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Anfrage ansehen
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
