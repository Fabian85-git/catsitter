import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AvailableSittersPage({ params }: { params: { id: string } }) {
  const absenceId = params.id

  // Mock data - available sitters for this absence period
  const availableSitters = [
    {
      id: "sandra",
      name: "Sandra",
      photo: "/orange-tabby-cat.jpg",
      rating: 4.9,
      distance: "0.8 km",
      type: "Tausch",
      cats: ["Mimi", "Luna"],
    },
    {
      id: "tommy",
      name: "Tommy",
      photo: "/gray-striped-cat.jpg",
      rating: 4.7,
      distance: "1.2 km",
      type: "Bezahlt",
      cats: ["Jesus"],
    },
    {
      id: "anna-kim",
      name: "Anna & Kim",
      photo: "/white-fluffy-cat.jpg",
      rating: 4.8,
      distance: "1.5 km",
      type: "Tausch",
      cats: ["Joe", "Zen"],
    },
    {
      id: "charly",
      name: "Charly",
      photo: "/black-white-cat.jpg",
      rating: 4.6,
      distance: "2.1 km",
      type: "Bezahlt",
      cats: ["Tom", "Speedy", "Sylvester"],
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header with Back Button */}
      <div className="px-4 py-4">
        <Link href={`/sitter/my-absences/${absenceId}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <main className="px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Verfügbare Sitter</h1>
        <p className="text-muted-foreground mb-6">Wähle einen Sitter für deine Abwesenheit</p>

        <div className="space-y-4">
          {availableSitters.map((sitter) => (
            <Link key={sitter.id} href={`/sitter/connect/${sitter.id}`}>
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer">
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
