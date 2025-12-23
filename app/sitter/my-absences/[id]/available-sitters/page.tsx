"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, MapPin, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { sitterProfiles } from "@/lib/sitter-data"
import { useRouter } from "next/navigation"

export default function AvailableSittersPage({ params }: { params: { id: string } }) {
  const absenceId = params.id
  const [selectedSitter, setSelectedSitter] = useState<string | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const router = useRouter()

  const availableSitters = [
    {
      id: sitterProfiles.sandra.id,
      name: sitterProfiles.sandra.name,
      photo: sitterProfiles.sandra.avatar,
      rating: sitterProfiles.sandra.rating,
      distance: sitterProfiles.sandra.distance,
      type:
        sitterProfiles.sandra.paymentType === "both"
          ? "Tausch & Bezahlt"
          : sitterProfiles.sandra.paymentType === "tausch"
            ? "Tausch"
            : "Bezahlt",
      cats: sitterProfiles.sandra.cats.map((c) => c.name),
      photos: sitterProfiles.sandra.photos,
      description: sitterProfiles.sandra.bio,
      location: sitterProfiles.sandra.location,
      reviews: sitterProfiles.sandra.reviewCount,
      catPhotos: sitterProfiles.sandra.cats.map((c) => c.image),
    },
    {
      id: sitterProfiles.tommy.id,
      name: sitterProfiles.tommy.name,
      photo: sitterProfiles.tommy.avatar,
      rating: sitterProfiles.tommy.rating,
      distance: sitterProfiles.tommy.distance,
      type:
        sitterProfiles.tommy.paymentType === "both"
          ? "Tausch & Bezahlt"
          : sitterProfiles.tommy.paymentType === "tausch"
            ? "Tausch"
            : "Bezahlt",
      cats: sitterProfiles.tommy.cats.map((c) => c.name),
      photos: sitterProfiles.tommy.photos,
      description: sitterProfiles.tommy.bio,
      location: sitterProfiles.tommy.location,
      reviews: sitterProfiles.tommy.reviewCount,
      catPhotos: sitterProfiles.tommy.cats.map((c) => c.image),
    },
    {
      id: sitterProfiles["anna-kim"].id,
      name: sitterProfiles["anna-kim"].name,
      photo: sitterProfiles["anna-kim"].avatar,
      rating: sitterProfiles["anna-kim"].rating,
      distance: sitterProfiles["anna-kim"].distance,
      type:
        sitterProfiles["anna-kim"].paymentType === "both"
          ? "Tausch & Bezahlt"
          : sitterProfiles["anna-kim"].paymentType === "tausch"
            ? "Tausch"
            : "Bezahlt",
      cats: sitterProfiles["anna-kim"].cats.map((c) => c.name),
      photos: sitterProfiles["anna-kim"].photos,
      description: sitterProfiles["anna-kim"].bio,
      location: sitterProfiles["anna-kim"].location,
      reviews: sitterProfiles["anna-kim"].reviewCount,
      catPhotos: sitterProfiles["anna-kim"].cats.map((c) => c.image),
    },
    {
      id: sitterProfiles.charly.id,
      name: sitterProfiles.charly.name,
      photo: sitterProfiles.charly.avatar,
      rating: sitterProfiles.charly.rating,
      distance: sitterProfiles.charly.distance,
      type:
        sitterProfiles.charly.paymentType === "both"
          ? "Tausch & Bezahlt"
          : sitterProfiles.charly.paymentType === "tausch"
            ? "Tausch"
            : "Bezahlt",
      cats: sitterProfiles.charly.cats.map((c) => c.name),
      photos: sitterProfiles.charly.photos,
      description: sitterProfiles.charly.bio,
      location: sitterProfiles.charly.location,
      reviews: sitterProfiles.charly.reviewCount,
      catPhotos: sitterProfiles.charly.cats.map((c) => c.image),
    },
  ]

  const sitterProfile = availableSitters.find((s) => s.id === selectedSitter)

  useEffect(() => {
    if (!sitterProfile) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      const scrollPosition = target.scrollLeft
      const photoWidth = target.offsetWidth
      const index = Math.round(scrollPosition / photoWidth)
      setCurrentPhotoIndex(index)
    }

    const photoGallery = document.getElementById("sitter-photo-gallery")
    if (photoGallery) {
      photoGallery.addEventListener("scroll", handleScroll)
      return () => photoGallery.removeEventListener("scroll", handleScroll)
    }
  }, [sitterProfile])

  useEffect(() => {
    if (selectedSitter) {
      setCurrentPhotoIndex(0)
    }
  }, [selectedSitter])

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header with Back Button */}
      <div className="px-4 py-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push(`/sitter/my-absences/${absenceId}`)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <main className="px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Verfügbare Sitter</h1>
        <p className="text-muted-foreground mb-6">Wähle einen Sitter für deine Abwesenheit</p>

        <div className="space-y-4">
          {availableSitters.map((sitter) => (
            <div
              key={sitter.id}
              onClick={() => setSelectedSitter(sitter.id)}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
            >
              <Image
                src={sitter.photo || "/placeholder.svg"}
                alt={sitter.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{sitter.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">
                    {sitter.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{sitter.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{sitter.distance}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {sitter.cats.length} {sitter.cats.length === 1 ? "Katze" : "Katzen"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedSitter && sitterProfile && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedSitter(null)} />

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedSitter(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Photo Gallery */}
              <div className="relative">
                <div
                  id="sitter-photo-gallery"
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: "none" }}
                >
                  {sitterProfile.photos.map((photo, index) => (
                    <div key={index} className="flex-shrink-0 w-full snap-center">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${sitterProfile.name} photo ${index + 1}`}
                        width={800}
                        height={500}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
                {/* Photo Counter */}
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentPhotoIndex + 1}/{sitterProfile.photos.length}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 space-y-6">
                {/* Name and Rating */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{sitterProfile.name}</h2>
                    <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">
                      {sitterProfile.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{sitterProfile.rating}</span>
                    <span className="text-sm">({sitterProfile.reviews} Bewertungen)</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Über mich</h3>
                  <p className="text-muted-foreground">{sitterProfile.description}</p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold mb-2">Standort</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{sitterProfile.location}</span>
                  </div>
                </div>

                {/* Cats */}
                <div>
                  <h3 className="font-semibold mb-3">Meine {sitterProfile.cats.length === 1 ? "Katze" : "Katzen"}</h3>
                  <div className="flex gap-4">
                    {sitterProfile.catPhotos.map((photo, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <Image
                          src={photo || "/placeholder.svg"}
                          alt={sitterProfile.cats[index]}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{sitterProfile.cats[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <Button className="w-full bg-[#5682D3] hover:bg-[#4571C2] text-white">Kontaktieren</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
