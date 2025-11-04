import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Trash2, Edit, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function AbsenceDetailPage({ params }: { params: { id: string } }) {
  const absenceId = Number.parseInt(params.id)

  // Mock data - in a real app, this would come from a database
  const absences = [
    {
      id: 1,
      title: "Wanderweekend",
      status: "assigned",
      sitterName: "Sandra",
      sitterPhoto: "/orange-tabby-cat.jpg",
      dates: "2.-3. November 2025",
      time: "9:00 - 10:00 Uhr",
      frequency: "2x täglich - morgen / abends",
      notes: "Nassfutter und Brekkies oder so. Bitte auch frisches Wasser bereitstellen.",
      type: "Tausch",
    },
    {
      id: 2,
      title: "Neujahr",
      status: "open",
      dates: "28. Dezember 2025 - 2. Januar 2026",
      time: "8:00 - 8:30 Uhr, 17:00 - 17:30 Uhr",
      frequency: "2x täglich - morgen / abends",
      notes: "Nassfutter und Brekkies oder so. Die Katzen mögen es, wenn man mit ihnen spielt.",
      type: "Tausch",
    },
    {
      id: 3,
      title: "Städtetrip",
      status: "open",
      dates: "19.-23. Januar 2026",
      time: "8:00 - 8:30 Uhr, 17:00 - 17:30 Uhr",
      frequency: "2x täglich - morgen / abends",
      notes: "Nassfutter und Brekkies oder so. Bitte Katzenklo täglich reinigen.",
      type: "Tausch",
    },
  ]

  const absence = absences.find((a) => a.id === absenceId)

  if (!absence) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header with Back Button */}
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/sitter/my-absences">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Edit className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:text-destructive">
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <main className="px-4 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-balance">{absence.title}</h1>

        <div className="space-y-6">
          {/* Sitter Info - Only show if assigned */}
          {absence.status === "assigned" && absence.sitterName && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Katzensitter</h2>
              <div className="flex items-center gap-4">
                <Image
                  src={absence.sitterPhoto || "/placeholder.svg"}
                  alt={absence.sitterName}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{absence.sitterName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Bestätigt</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status for open absences */}
          {absence.status === "open" && (
            <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-medium">Noch kein Sitter gefunden</span>
            </div>
          )}

          {/* Date */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Datum</h2>
            <div className="flex items-center gap-3 text-foreground">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span>{absence.dates}</span>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Uhrzeit</h2>
            <div className="flex items-center gap-3 text-foreground">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span>{absence.time}</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8">{absence.frequency}</p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Notizen</h2>
            <p className="text-foreground leading-relaxed">{absence.notes}</p>
          </div>

          {/* Contact Button - Only show if sitter is assigned */}
          {absence.status === "assigned" && absence.sitterName && (
            <Link href={`/sitter/connect/sandra/message`} className="block">
              <Button className="w-full h-12 text-base" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                {absence.sitterName} kontaktieren
              </Button>
            </Link>
          )}

          {/* Find Sitter Button - Only show if open */}
          {absence.status === "open" && (
            <Link href={`/sitter/my-absences/${absenceId}/available-sitters`} className="block">
              <Button variant="outline" className="w-full h-12 text-base bg-transparent" size="lg">
                Verfügbare Sitter anzeigen
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
