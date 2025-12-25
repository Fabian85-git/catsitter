"use client"

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import { ChevronRight, MapPin, Star, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { sitterProfiles, type SitterProfile } from "@/lib/sitter-data"

export default function HomePage() {
  const router = useRouter()
  const [selectedSitter, setSelectedSitter] = useState<SitterProfile | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const mapMarkers = [
    { sitter: sitterProfiles.sandra, lat: 47.371, lng: 8.526 },
    { sitter: sitterProfiles["anna-kim"], lat: 47.388, lng: 8.548 },
    { sitter: sitterProfiles.tommy, lat: 47.365, lng: 8.54 },
    { sitter: sitterProfiles.charly, lat: 47.385, lng: 8.53 },
    { sitter: sitterProfiles.esmeralda, lat: 47.368, lng: 8.535 },
    { sitter: sitterProfiles.sandra, lat: 47.378, lng: 8.545 },
    { sitter: sitterProfiles.tommy, lat: 47.372, lng: 8.555 },
  ]

  const handleMarkerClick = (sitter: SitterProfile) => {
    setSelectedSitter(sitter)
    setIsSheetOpen(true)
    setCurrentPhotoIndex(0)
  }

  useEffect(() => {
    if (!selectedSitter) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      const scrollPosition = target.scrollLeft
      const photoWidth = target.offsetWidth
      const index = Math.round(scrollPosition / photoWidth)
      setCurrentPhotoIndex(index)
    }

    const photoGallery = document.getElementById("home-sitter-photo-gallery")
    if (photoGallery) {
      photoGallery.addEventListener("scroll", handleScroll)
      return () => photoGallery.removeEventListener("scroll", handleScroll)
    }
  }, [selectedSitter])

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader className="sticky top-0" />

      <main className="space-y-6">
        <div className="px-4 py-6 max-w-screen-xl mx-auto">
          {/* Next Appointment Section */}
          <section>
            <h2 className="font-bold mb-4 text-balance text-xl">Nächster Termin</h2>

            <Card
              className="p-4 border shadow-none cursor-pointer hover:bg-muted/50 transition-colors py-4"
              onClick={() => router.push("/termine/1")}
            >
              {/* Title Row - Full Width */}
              <div className="flex items-center justify-between mb-0">
                <h3 className="text-xl font-semibold">28. September 2025</h3>
                <span className="rounded-full bg-[#5682D3] text-white px-2.5 py-1 font-normal text-xs">Sitting</span>
              </div>

              {/* Profile Info Row */}
              <div className="flex gap-3 items-center my-[-10px] mb-0">
                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  <img src="/smiling-brown-haired-woman.png" alt="Anna" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg mb-0.5">Anna</p>
                  <p className="text-muted-foreground mb-0.5">9:00 - 10:00 Uhr</p>
                  <p className="text-foreground">Blanca & Bionda 🐱 🐱</p>
                </div>
              </div>
            </Card>

            <Link
              href="/termine"
              className="flex items-center gap-2 mt-4 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-medium">Alle Termine anzeigen</span>
            </Link>
          </section>
        </div>

        <section>
          <div className="px-4 max-w-screen-xl mx-auto mb-4">
            <h2 className="font-bold text-balance text-xl">Katzensitter in deiner Umgebung</h2>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <MapView markers={mapMarkers} onMarkerClick={handleMarkerClick} />
          </div>

          <div className="px-4 max-w-screen-xl mx-auto mt-4">
            <Link
              href="/sitter/connect"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-medium">Erweiterte Suche</span>
            </Link>
          </div>
        </section>
      </main>

      {selectedSitter && isSheetOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsSheetOpen(false)} />

          <div className="fixed inset-x-0 bottom-0 z-[70] bg-background rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsSheetOpen(false)}
                className="rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Photo Gallery */}
              <div className="relative">
                <div
                  id="home-sitter-photo-gallery"
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none" }}
                >
                  {selectedSitter.photos.map((photo, index) => (
                    <div key={index} className="flex-shrink-0 w-full snap-center">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`${selectedSitter.name} photo ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
                {/* Photo Counter */}
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentPhotoIndex + 1}/{selectedSitter.photos.length}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 space-y-6 pb-24">
                {/* Name and Rating */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{selectedSitter.name}</h2>
                    <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">
                      {selectedSitter.paymentType === "tausch"
                        ? "Tausch"
                        : selectedSitter.paymentType === "bezahlt"
                          ? "Bezahlt"
                          : "Tausch & Bezahlt"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedSitter.rating}</span>
                    <span className="text-sm">({selectedSitter.reviewCount} Bewertungen)</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Über mich</h3>
                  <p className="text-muted-foreground">{selectedSitter.fullBio || selectedSitter.bio}</p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-2">Standort</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedSitter.location}</span>
                  </div>
                </div>

                {/* Cats */}
                {selectedSitter.cats && selectedSitter.cats.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">
                      Meine {selectedSitter.cats.length === 1 ? "Katze" : "Katzen"}
                    </h3>
                    <div className="flex gap-4">
                      {selectedSitter.cats.map((cat, index) => (
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

                {/* Contact Button */}
                <button
                  onClick={() => {
                    setIsSheetOpen(false)
                    router.push(`/sitter/connect/${selectedSitter.id}`)
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

      <BottomNav />
    </div>
  )
}
