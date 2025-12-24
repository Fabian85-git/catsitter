"use client"

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
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

  const mapMarkers = [
    { sitter: sitterProfiles.sandra, position: { top: "20%", left: "15%" } },
    { sitter: sitterProfiles["anna-kim"], position: { top: "35%", right: "25%" } },
    { sitter: sitterProfiles.tommy, position: { bottom: "30%", left: "40%" } },
    { sitter: sitterProfiles.charly, position: { top: "50%", right: "15%" } },
    { sitter: sitterProfiles.esmeralda, position: { bottom: "20%", left: "25%" } },
    { sitter: sitterProfiles.sandra, position: { top: "45%", left: "55%" } },
    { sitter: sitterProfiles.tommy, position: { bottom: "35%", right: "35%" } },
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
      <AppHeader />

      <main className="space-y-6">
        <div className="px-4 py-6 max-w-screen-xl mx-auto">
          {/* Next Appointment Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-balance">Nächster Termin</h2>

            <Card
              className="p-4 border shadow-none cursor-pointer hover:bg-muted/50 transition-colors py-6"
              onClick={() => router.push("/termine/1")}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  <img src="/smiling-brown-haired-woman.png" alt="Anna" className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-1 items-center">
                    <p className="font-semibold text-lg">28. September 2025</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 bg-blue-100 text-blue-700">
                      Sitting
                    </span>
                  </div>
                  <p className="text-muted-foreground">9:00 - 10:00 Uhr</p>
                  <p className="text-foreground">
                    bei <span className="font-medium">Anna</span> • Blanca & Bionda 🐱 🐱
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight className="text-muted-foreground flex-shrink-0 w-7 h-7" />
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
            <h2 className="text-2xl font-bold text-balance">Katzensitter in deiner Umgebung</h2>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43239.82579415253!2d8.517445!3d47.376888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc0e6e41%3A0xf5c698b65f8c52a7!2sZ%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1234567890&disableDefaultUI=true&zoomControl=false"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {mapMarkers.map((marker, index) => (
              <div
                key={index}
                className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform"
                style={marker.position}
                onClick={() => handleMarkerClick(marker.sitter)}
                title={marker.sitter.name}
              >
                😺
              </div>
            ))}
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
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSheetOpen(false)} />

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
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
              <div className="p-6 space-y-6">
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
