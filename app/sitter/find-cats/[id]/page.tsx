"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar, MapPin, Star, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

// Mock data - in a real app, this would come from a database
const sitterRequestsData: Record<
  string,
  {
    id: number
    name: string
    image: string
    photos: string[]
    cats: Array<{ name: string; age: number; image: string }>
    distance: string
    dates: string
    status: "Tausch" | "Bezahlt"
    price?: number
    notes: string
    description: string
    rating: number
    reviewCount: number
  }
> = {
  "1": {
    id: 1,
    name: "Sandra",
    image: "/orange-tabby-cat.jpg",
    photos: [
      "/orange-tabby-cat-close-up-looking-up.jpg",
      "/siamese-cat-sitting.jpg",
      "/orange-maine-coon-cat.jpg",
      "/happy-orange-tabby-cat-portrait.jpg",
      "/grey-cat-playing-with-toy.jpg",
      "/woman-with-cat-selfie.jpg",
    ],
    cats: [
      { name: "Joe", age: 3, image: "/orange-tabby-cat.jpg" },
      { name: "Zen", age: 5, image: "/grey-white-cat.jpg" },
    ],
    distance: "ca. 60m entfernt",
    dates: "2.-3. November 2025",
    status: "Tausch",
    notes: "Meine Katzen sind sehr verspielt und brauchen 2x täglich Nassfutter. Sie lieben es, draußen zu sein.",
    description:
      "Hi ich heisse Sandra, wohne in Zürich mit meinen zwei Katzen Joe und Zen. Dank der Katzentür haben sie Zugang zur Aussenwelt. Gerne verreise ich für ein paar Tage auf Städtetrips.",
    rating: 4.9,
    reviewCount: 39,
  },
  "2": {
    id: 2,
    name: "Adrian",
    image: "/grey-white-cat.jpg",
    photos: [
      "/grey-white-cat.jpg",
      "/orange-tabby-cat.jpg",
      "/siamese-cat-sitting.jpg",
      "/grey-cat-playing-with-toy.jpg",
    ],
    cats: [
      { name: "Joe", age: 2, image: "/grey-white-cat.jpg" },
      { name: "Zen", age: 4, image: "/orange-tabby-cat.jpg" },
    ],
    distance: "ca. 90m entfernt",
    dates: "15. November 2025",
    status: "Tausch",
    notes: "Beide Katzen sind ruhig und pflegeleicht. Fütterung morgens und abends mit Trockenfutter.",
    description:
      "Hallo, ich bin Adrian und habe zwei wunderbare Katzen. Ich reise gerne und suche jemanden, der sich liebevoll um meine Katzen kümmert.",
    rating: 4.8,
    reviewCount: 25,
  },
  "3": {
    id: 3,
    name: "Anna",
    image: "/smiling-brown-haired-woman.png",
    photos: [
      "/smiling-brown-haired-woman.png",
      "/siamese-cat-sitting.jpg",
      "/orange-maine-coon.jpg",
      "/happy-orange-tabby-cat-portrait.jpg",
    ],
    cats: [
      { name: "Joe", age: 1, image: "/siamese-cat-sitting.jpg" },
      { name: "Zen", age: 6, image: "/orange-maine-coon.jpg" },
    ],
    distance: "ca. 120m entfernt",
    dates: "1.-7. November 2025",
    status: "Bezahlt",
    price: 45,
    notes: "Joe ist noch jung und sehr aktiv. Zen ist entspannt. Beide bekommen Nassfutter und Brekkies.",
    description:
      "Ich bin Anna und lebe mit meinen zwei Katzen in Zürich. Joe ist noch jung und verspielt, Zen ist schon älter und entspannter.",
    rating: 4.7,
    reviewCount: 18,
  },
  "4": {
    id: 4,
    name: "Charly",
    image: "/dark-haired-man.png",
    photos: ["/dark-haired-man.png", "/grey-tabby-cat-face.jpg", "/fluffy-persian-cat.jpg", "/orange-tabby-cat.jpg"],
    cats: [
      { name: "Joe", age: 4, image: "/grey-tabby-cat-face.jpg" },
      { name: "Zen", age: 3, image: "/fluffy-persian-cat.jpg" },
    ],
    distance: "ca. 210m entfernt",
    dates: "12.-15. November 2025",
    status: "Tausch",
    notes: "Meine Katzen sind Wohnungskatzen und sehr anhänglich. Sie brauchen viel Aufmerksamkeit.",
    description:
      "Hi, ich bin Charly. Meine Katzen sind Wohnungskatzen und sehr anhänglich. Sie lieben Gesellschaft und Streicheleinheiten.",
    rating: 4.9,
    reviewCount: 32,
  },
  "5": {
    id: 5,
    name: "Esmeralda",
    image: "/fluffy-persian-cat.jpg",
    photos: ["/fluffy-persian-cat.jpg", "/grey-white-cat.jpg", "/orange-tabby-cat.jpg", "/siamese-cat-sitting.jpg"],
    cats: [{ name: "Joe", age: 7, image: "/fluffy-persian-cat.jpg" }],
    distance: "ca. 40m entfernt",
    dates: "5.-9. November 2025",
    status: "Tausch",
    notes: "Joe ist eine ältere Katze und sehr ruhig. Er braucht nur einmal täglich Futter und Wasser.",
    description:
      "Ich bin Esmeralda und habe eine ältere, sehr ruhige Katze. Joe ist pflegeleicht und genießt seine Ruhe.",
    rating: 4.8,
    reviewCount: 21,
  },
  "6": {
    id: 6,
    name: "Flo",
    image: "/bearded-man.jpg",
    photos: [
      "/bearded-man.jpg",
      "/orange-maine-coon-cat.jpg",
      "/grey-cat-playing-with-toy.jpg",
      "/happy-orange-tabby-cat-portrait.jpg",
    ],
    cats: [{ name: "Joe", age: 2, image: "/orange-maine-coon-cat.jpg" }],
    distance: "ca. 40m entfernt",
    dates: "5.-9. November 2025",
    status: "Bezahlt",
    price: 50,
    notes: "Joe ist sehr freundlich und liebt Spielzeug. Bitte 2x täglich füttern und mit ihm spielen.",
    description:
      "Hallo, ich bin Flo. Meine Katze Joe ist sehr verspielt und freundlich. Er liebt es, mit Spielzeug zu spielen.",
    rating: 4.9,
    reviewCount: 28,
  },
}

export default function FindCatsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [showReviews, setShowReviews] = useState(false)
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const request = sitterRequestsData[id]

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

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Inserat nicht gefunden</p>
      </div>
    )
  }

  const reviews = [
    {
      id: 1,
      name: "Anna",
      rating: 5,
      comment: `${request.name} ist fantastisch! Sehr zuverlässig und kommunikativ.`,
      date: "vor 2 Wochen",
    },
    {
      id: 2,
      name: "Tommy",
      rating: 5,
      comment: "Absolut empfehlenswert! Hat sich liebevoll um meine Katze gekümmert.",
      date: "vor 1 Monat",
    },
    {
      id: 3,
      name: "Charly",
      rating: 5,
      comment: "Super nett und verantwortungsbewusst. Meine Katzen waren sehr entspannt.",
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
          {request.photos.map((photo, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0 snap-center">
              <Image
                src={photo || "/placeholder.svg"}
                alt={`${request.name}'s photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentPhotoIndex + 1}/{request.photos.length}
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowReviews(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Star className="w-6 h-6 fill-current text-yellow-500" />
            <span className="text-xl font-semibold">
              {request.rating} ({request.reviewCount})
            </span>
          </button>
          <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">{request.status}</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{request.name}</h1>

        <p className="text-base leading-relaxed mb-2">{request.description}</p>
        <button className="text-primary font-medium mb-6">mehr</button>

        <div className="flex items-start gap-3 mb-8 text-muted-foreground">
          <MapPin className="w-6 h-6 mt-0.5 flex-shrink-0" />
          <span>{request.distance}</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Datum</h2>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5" />
            <span>{request.dates}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Katzen</h2>
          <div className="flex gap-6">
            {request.cats.map((cat, index) => (
              <div key={index} className="text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                  <Image src={cat.image || "/placeholder.svg"} alt={cat.name} fill className="object-cover" />
                </div>
                <p className="font-semibold">
                  {cat.name}, {cat.age}jr.
                </p>
              </div>
            ))}
          </div>
        </div>

        {request.status === "Bezahlt" && request.price && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Preis</h2>
            <p className="text-lg font-semibold">CHF {request.price} pro Tag</p>
          </div>
        )}

        {/* Notes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Notizen</h2>
          <p className="text-foreground leading-relaxed">{request.notes}</p>
        </div>

        <div className="space-y-3">
          <Link href={`/sitter/find-cats/${id}/message`} className="block">
            <Button className="w-full text-lg" size="lg">
              Kontaktieren
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full text-lg bg-transparent"
            size="lg"
            onClick={() => setShowBookingConfirmation(true)}
          >
            Buchen
          </Button>
        </div>
      </main>

      {showReviews && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in" onClick={() => setShowReviews(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Bewertungen</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowReviews(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-64px)] px-4 py-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1">{request.rating}</div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{request.reviewCount} Bewertungen</div>
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
              Vielen Dank! Sobald deine Buchung von {request.name} bestätigt wurde wirst du von uns kontaktiert.
            </p>
            <Button className="w-full" onClick={() => setShowBookingConfirmation(false)}>
              Schliessen
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
