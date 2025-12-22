"use client"

import { useParams, useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { getItemById } from "@/lib/marketplace-data"

export default function MarktplatzDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showContactMessage, setShowContactMessage] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const item = getItemById(Number(params.id))

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const itemWidth = container.offsetWidth
      const index = Math.round(scrollLeft / itemWidth)
      setCurrentPhotoIndex(index)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  if (!item) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader />
        <main className="px-4 py-6 max-w-screen-xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück
          </Button>
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Artikel nicht gefunden</p>
          </div>
        </main>
        <BottomNav />
      </div>
    )
  }

  const handleBuy = () => {
    setShowContactMessage(true)
    setTimeout(() => {
      setShowContactMessage(false)
    }, 3000)
  }

  const photos = item.images && item.images.length > 0 ? item.images : [item.image, item.image, item.image]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative w-full aspect-[8/5]">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0 snap-center">
              <Image
                src={photo || "/placeholder.svg"}
                alt={`${item.title} - Bild ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentPhotoIndex + 1}/{photos.length}
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">CHF {item.price}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">{item.category}</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">{item.title}</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Beschreibung</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
        </div>

        <div className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-bold mb-3">Verkäufer</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">{item.seller}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={handleBuy} className="w-full text-lg" size="lg">
            Kaufen
          </Button>
          {showContactMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                Verkäufer wurde kontaktiert! Du erhältst bald eine Nachricht.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
