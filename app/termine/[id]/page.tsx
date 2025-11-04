"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function AppointmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.id as string

  // Mock appointment data - in a real app, this would come from a database
  const appointments = [
    {
      id: "1",
      type: "sitting",
      date: "28. September 2025",
      time: "9:00 - 10:00 Uhr",
      person: "Anna",
      image: "/smiling-brown-haired-woman.png",
      cats: "Blanca & Bionda",
      address: "Bahnhofstrasse 45, 8001 Zürich",
      info: "Bitte Nassfutter morgens geben und frisches Wasser bereitstellen. Die Katzen sind sehr freundlich und lieben es zu spielen.",
    },
    {
      id: "2",
      type: "sitting",
      date: "30. September 2025",
      time: "8:00 - 8:30 Uhr, 17:00 - 17:30 Uhr",
      person: "Tommy",
      image: "/grey-tabby-cat-face.jpg",
      cats: "El Negro",
      address: "Limmatstrasse 78, 8005 Zürich",
      info: "2x täglich nur füttern. Nassfutter und Brekkies oder so. El Negro ist etwas scheu, aber sehr lieb.",
    },
    {
      id: "3",
      type: "sitting",
      date: "11. Oktober 2025",
      time: "9:00 - 10:00 Uhr",
      person: "Anna",
      image: "/smiling-brown-haired-woman.png",
      cats: "Blanca & Bionda",
      address: "Bahnhofstrasse 45, 8001 Zürich",
      info: "Bitte Nassfutter morgens geben und frisches Wasser bereitstellen. Die Katzen sind sehr freundlich und lieben es zu spielen.",
    },
    {
      id: "4",
      type: "being-sat",
      date: "2. November 2025",
      time: "2x täglich",
      person: "Sandra",
      image: "/blonde-woman-portrait.png",
      cats: "Mimi & Luna",
      address: "Meine Adresse: Seestrasse 120, 8002 Zürich",
      info: "Sandra kommt 2x täglich vorbei um meine Katzen zu füttern und mit ihnen zu spielen. Bitte Trockenfutter und frisches Wasser bereitstellen.",
    },
    {
      id: "5",
      type: "being-sat",
      date: "3. November 2025",
      time: "2x täglich",
      person: "Charly",
      image: "/dark-haired-man.png",
      cats: "Mimi & Luna",
      address: "Meine Adresse: Seestrasse 120, 8002 Zürich",
      info: "Charly kümmert sich um meine Katzen während ich weg bin. Die Katzen kennen ihn bereits und mögen ihn sehr.",
    },
  ]

  const appointment = appointments.find((apt) => apt.id === appointmentId) || appointments[0]

  const handleCancel = () => {
    if (confirm("Möchten Sie diesen Termin wirklich absagen?")) {
      router.push("/termine")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/termine">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Termindetails</h1>
          <Button variant="ghost" size="icon" onClick={handleCancel} className="text-destructive">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <main className="px-4 py-6 max-w-screen-xl mx-auto space-y-6">
        {/* Date and Time */}
        <Card className="p-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Datum</p>
              <p className="text-lg font-semibold">{appointment.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Uhrzeit</p>
              <p className="text-lg font-semibold">{appointment.time}</p>
            </div>
          </div>
        </Card>

        {/* Person Info */}
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-3">
            {appointment.type === "sitting" ? "Bei wem Zuhause" : "Wer sittet meine Katzen"}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
              <img
                src={appointment.image || "/placeholder.svg"}
                alt={appointment.person}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xl font-semibold">{appointment.person}</p>
              {appointment.type === "being-sat" && <p className="text-sm text-muted-foreground">sittet meine Katzen</p>}
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Adresse</p>
            <p className="text-base">{appointment.address}</p>
          </div>

          {/* Cats */}
          <div>
            <p className="text-sm text-muted-foreground">
              {appointment.type === "sitting" ? "Katzen" : "Meine Katzen"}
            </p>
            <p className="text-base font-medium">{appointment.cats}</p>
          </div>
        </Card>

        {/* Info Text */}
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Wichtige Informationen</p>
          <p className="text-base leading-relaxed">{appointment.info}</p>
        </Card>

        {/* Contact Button */}
        <Link href={`/termine/${appointmentId}/contact`}>
          <Button className="w-full gap-2" size="lg">
            <MessageCircle className="w-5 h-5" />
            Person kontaktieren
          </Button>
        </Link>
      </main>
    </div>
  )
}
