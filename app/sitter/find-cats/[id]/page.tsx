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
    fullDescription: string
    fullNotes: string
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
    fullNotes:
      "Meine Katzen sind sehr verspielt und brauchen 2x täglich Nassfutter. Sie lieben es, draußen zu sein. Joe bevorzugt Hühnchen-Geschmack und Zen mag Lachs. Bitte achte darauf, dass die Katzentür abends offen bleibt, damit sie nach ihrem Streifzug wieder rein können. Sie sind sehr selbstständig und brauchen nicht viel Aufmerksamkeit, freuen sich aber über ein paar Streicheleinheiten zwischendurch.",
    description:
      "Hi ich heisse Sandra, wohne in Zürich mit meinen zwei Katzen Joe und Zen. Dank der Katzentür haben sie Zugang zur Aussenwelt. Gerne verreise ich für ein paar Tage auf Städtetrips.",
    fullDescription:
      "Hi ich heisse Sandra, wohne in Zürich mit meinen zwei Katzen Joe und Zen. Dank der Katzentür haben sie Zugang zur Aussenwelt. Gerne verreise ich für ein paar Tage auf Städtetrips. Ich arbeite im Marketing und nutze jede Gelegenheit für Wochenendausflüge. Da ich selbst Katzensitterin bin, weiss ich genau, wie wichtig eine zuverlässige Betreuung ist. Meine beiden sind sehr unkompliziert und gewöhnt an Besucher.",
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
    fullNotes:
      "Beide Katzen sind ruhig und pflegeleicht. Fütterung morgens und abends mit Trockenfutter. Joe trinkt gerne aus einem Brunnen, bitte diesen täglich auffüllen. Zen schläft am liebsten auf dem Sofa und ist sehr verschmust am Abend. Das Katzenklo bitte einmal täglich reinigen.",
    description:
      "Hallo, ich bin Adrian und habe zwei wunderbare Katzen. Ich reise gerne und suche jemanden, der sich liebevoll um meine Katzen kümmert.",
    fullDescription:
      "Hallo, ich bin Adrian und habe zwei wunderbare Katzen. Ich reise gerne und suche jemanden, der sich liebevoll um meine Katzen kümmert. Ich bin Softwareentwickler und arbeite manchmal remote von verschiedenen Orten aus. Meine Katzen sind an eine ruhige Umgebung gewöhnt und freuen sich über Gesellschaft, auch wenn sie nicht zu aufdringlich sein muss.",
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
    fullNotes:
      "Joe ist noch jung und sehr aktiv. Zen ist entspannt. Beide bekommen Nassfutter und Brekkies. Joe braucht viel Beschäftigung - bitte täglich mit der Federangel spielen. Zen ist schon älter und hat Spezialfutter, das im Schrank steht. Bitte das Futter nicht verwechseln. Joe schläft nachts manchmal im Bett, das ist völlig normal.",
    description:
      "Ich bin Anna und lebe mit meinen zwei Katzen in Zürich. Joe ist noch jung und verspielt, Zen ist schon älter und entspannter.",
    fullDescription:
      "Ich bin Anna und lebe mit meinen zwei Katzen in Zürich. Joe ist noch jung und verspielt, Zen ist schon älter und entspannter. Ich arbeite als Grafikdesignerin und reise gelegentlich zu Kunden oder für Inspiration. Die beiden haben sehr unterschiedliche Persönlichkeiten, was das Zusammenleben spannend macht. Joe hält mich auf Trab, während Zen für die Ruhe sorgt.",
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
    fullNotes:
      "Meine Katzen sind Wohnungskatzen und sehr anhänglich. Sie brauchen viel Aufmerksamkeit. Joe folgt mir überall hin und miaut, wenn er alleine ist. Zen braucht tägliches Bürsten wegen seines langen Fells. Beide lieben Leckerlis und Spielzeit. Bitte mindestens 2-3 Stunden pro Tag bei ihnen verbringen.",
    description:
      "Hi, ich bin Charly. Meine Katzen sind Wohnungskatzen und sehr anhänglich. Sie lieben Gesellschaft und Streicheleinheiten.",
    fullDescription:
      "Hi, ich bin Charly. Meine Katzen sind Wohnungskatzen und sehr anhänglich. Sie lieben Gesellschaft und Streicheleinheiten. Ich arbeite normalerweise von zu Hause aus, daher sind die beiden es gewohnt, dass immer jemand da ist. Wenn ich verreise, brauchen sie definitiv jemanden, der Zeit mit ihnen verbringt. Sie sind sehr sozial und freundlich gegenüber allen Menschen.",
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
    fullNotes:
      "Joe ist eine ältere Katze und sehr ruhig. Er braucht nur einmal täglich Futter und Wasser. Er schläft die meiste Zeit und ist sehr pflegeleicht. Einmal am Tag vorbeischauen reicht völlig aus. Er hat keine besonderen Bedürfnisse, freut sich aber über ein paar ruhige Streicheleinheiten. Sein Futter steht in der Küche bereit.",
    description:
      "Ich bin Esmeralda und habe eine ältere, sehr ruhige Katze. Joe ist pflegeleicht und genießt seine Ruhe.",
    fullDescription:
      "Ich bin Esmeralda und habe eine ältere, sehr ruhige Katze. Joe ist pflegeleicht und genießt seine Ruhe. Ich reise selten, aber wenn, dann weiss ich, dass Joe nicht viel Aufwand macht. Er ist schon seit vielen Jahren bei mir und hat seine Routine. Ein perfekter Mitbewohner für jemanden, der es gerne ruhig hat.",
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
    fullNotes:
      "Joe ist sehr freundlich und liebt Spielzeug. Bitte 2x täglich füttern und mit ihm spielen. Er hat eine große Sammlung an Spielzeugen - sein Favorit ist die rote Maus. Morgens um 7 Uhr und abends um 18 Uhr füttern. Er ist sehr energiegeladen und braucht mindestens 30 Minuten Spielzeit pro Tag. Er ist stubenrein und sehr sozial.",
    description:
      "Hallo, ich bin Flo. Meine Katze Joe ist sehr verspielt und freundlich. Er liebt es, mit Spielzeug zu spielen.",
    fullDescription:
      "Hallo, ich bin Flo. Meine Katze Joe ist sehr verspielt und freundlich. Er liebt es, mit Spielzeug zu spielen. Ich bin häufig beruflich unterwegs und suche deshalb regelmäßig nach zuverlässigen Sitterinnen und Sittern. Joe ist sehr unkompliziert und kommt mit allen Menschen gut zurecht. Er ist neugierig und freundlich.",
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
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showFullNotes, setShowFullNotes] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const request = sitterRequestsData[id]

  const handleBookingConfirm = () => {
    if (typeof window === "undefined") return

    // Get existing appointments
    const stored = localStorage.getItem("appointments")
    const appointments = stored ? JSON.parse(stored) : []

    // Create new pending appointment
    const newAppointment = {
      id: `pending-${Date.now()}`,
      date: request.dates,
      day: Number.parseInt(request.dates.split(".")[0].trim()) || new Date().getDate(),
      month: 11, // November for demo
      time: "Zeit wird bestätigt",
      type: "pending-booking",
      person: request.name,
      image: request.image,
      cats: request.cats.map((cat) => `${cat.name} 🐱`).join(" "),
      color: "orange",
      status: "pending",
    }

    // Add to appointments
    appointments.push(newAppointment)
    localStorage.setItem("appointments", JSON.stringify(appointments))

    setShowBookingConfirmation(true)
  }

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
        <button onClick={() => setShowFullDescription(true)} className="text-[#5682D3] font-medium mb-6">
          mehr
        </button>

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

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Notizen</h2>
          <p className="text-foreground leading-relaxed mb-2">{request.notes}</p>
          <button onClick={() => setShowFullNotes(true)} className="text-[#5682D3] font-medium">
            mehr
          </button>
        </div>

        <div className="space-y-3">
          <Link
            href={`/sitter/find-cats/${id}/message`}
            className="block"
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("messageRecipient", request.name)
              }
            }}
          >
            <Button className="w-full text-lg" size="lg">
              Kontaktieren
            </Button>
          </Link>
          <Button variant="outline" className="w-full text-lg bg-transparent" size="lg" onClick={handleBookingConfirm}>
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

      {showFullDescription && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
            onClick={() => setShowFullDescription(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Über {request.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFullDescription(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-64px)] px-4 py-6">
              <p className="text-base leading-relaxed">{request.fullDescription}</p>
            </div>
          </div>
        </>
      )}

      {showFullNotes && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in" onClick={() => setShowFullNotes(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Notizen</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFullNotes(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-64px)] px-4 py-6">
              <p className="text-base leading-relaxed">{request.fullNotes}</p>
            </div>
          </div>
        </>
      )}

      {showBookingConfirmation && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-center">Buchungsanfrage gesendet</h2>
              <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                Vielen Dank! Sobald deine Buchung von {request.name} bestätigt wurde, wirst du von uns kontaktiert. Du
                findest die Anfrage bei deinen Terminen.
              </p>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setShowBookingConfirmation(false)
                    router.push("/termine")
                  }}
                >
                  Zu meinen Terminen
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setShowBookingConfirmation(false)
                    router.back()
                  }}
                >
                  Zurück
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
