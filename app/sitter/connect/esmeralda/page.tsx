"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Star, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export default function EsmeraldaProfilePage() {
  const [showReviews, setShowReviews] = useState(false)
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const photos = [
    "/fluffy-persian-cat.jpg",
    "/orange-tabby-cat.jpg",
    "/grey-white-cat.jpg",
    "/woman-with-cat-selfie.jpg",
    "/cute-kitten-sleeping.jpg",
  ]

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

  const reviews = [
    {
      id: 1,
      name: "Sandra",
      rating: 5,
      comment: "Esmeralda ist wunderbar! Sehr liebevoll und aufmerksam mit den Katzen.",
      date: "vor 2 Wochen",
    },
    {
      id: 2,
      name: "Tommy",
      rating: 5,
      comment: "Absolut empfehlenswert! Meine Katze war sehr glücklich bei Esmeralda.",
      date: "vor 1 Monat",
    },
    {
      id: 3,
      name: "Anna",
      rating: 5,
      comment: "Super Erfahrung! Esmeralda hat sich toll um unsere Katzen gekümmert.",
      date: "vor 2 Monaten",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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
                alt={`Esmeralda's photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentPhotoIndex + 1}/{photos.length}
        </div>
        <Link href="/sitter/connect">
          <Button variant="secondary" size="icon" className="absolute top-4 left-4 bg-white/90 hover:bg-white">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowReviews(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Star className="w-6 h-6 fill-current text-yellow-500" />
            <span className="text-xl font-semibold">4.8 (22)</span>
          </button>
          <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">Tausch</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">Esmeralda</h1>

        <p className="text-base leading-relaxed mb-2">
          Hallo zusammen! Ich bin Esmeralda und habe zwei süsse Kater Joe und Zen. Ich arbeite teilweise von zu Hause
          und kann mich daher gut um Katzen kümmern. Meine Wohnung hat einen grossen Balkon, den die Katzen lieben.
        </p>
        <button className="text-primary font-medium mb-6" onClick={() => setShowDescription(true)}>
          mehr
        </button>

        <div className="flex items-start gap-3 mb-8 text-muted-foreground">
          <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Badenerstrasse (ca. 230m entfernt)</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Katzen</h2>
          <p className="text-muted-foreground mb-4">Hauskatzen</p>

          <div className="flex gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                <Image src="/orange-tabby-cat.jpg" alt="Joe" fill className="object-cover" />
              </div>
              <p className="font-semibold">Joe, 3jr.</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                <Image src="/grey-white-cat.jpg" alt="Zen" fill className="object-cover" />
              </div>
              <p className="font-semibold">Zen, 3jr.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/sitter/connect/esmeralda/message" className="block">
            <Button className="w-full text-lg" size="lg">
              Kontaktieren
            </Button>
          </Link>
        </div>
      </main>

      {showReviews && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in" onClick={() => setShowReviews(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Bewertungen</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowReviews(false)} className="rounded-full">
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-64px)] px-4 py-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1">4.8</div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">22 Bewertungen</div>
                </div>
              </div>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showBookingConfirmation && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
            onClick={() => setShowBookingConfirmation(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-background rounded-2xl p-6 max-w-md mx-auto animate-in zoom-in-95 duration-200">
            <p className="text-lg leading-relaxed text-center mb-6">
              Wenn deine Buchung angenommen wurde wirst du von uns kontaktiert.
            </p>
            <Button className="w-full rounded-full h-12" onClick={() => setShowBookingConfirmation(false)}>
              Schliessen
            </Button>
          </div>
        </>
      )}

      {showDescription && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
            onClick={() => setShowDescription(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Über Esmeralda</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowDescription(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-64px)] px-4 py-6">
              <p className="text-base leading-relaxed">
                Hallo zusammen! Ich bin Esmeralda und habe zwei süsse Kater Joe und Zen. Ich arbeite teilweise von zu
                Hause und kann mich daher gut um Katzen kümmern. Meine Wohnung hat einen grossen Balkon, den die Katzen
                lieben und wo sie sicher die Sonne geniessen können.
                <br />
                <br />
                Joe und Zen sind drei Jahre alt und sehr verschmust. Sie lieben es, auf dem Balkon zu liegen und die
                Umgebung zu beobachten. Da ich oft im Homeoffice bin, haben die Katzen immer Gesellschaft. Ich habe
                mehrere Jahre Erfahrung mit Katzenbetreuung und verstehe ihre Bedürfnisse gut. Meine Wohnung ist
                grosszügig und bietet viel Platz zum Spielen und Entspannen.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
