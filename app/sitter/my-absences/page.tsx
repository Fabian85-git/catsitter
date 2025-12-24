"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Plus, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAbsences } from "@/lib/hooks/use-absences"

const DEMO_ABSENCE = {
  id: "demo-sommerferien",
  userId: "current-user",
  title: "Sommerferien Italien",
  dates: "15.07.25 - 29.07.25",
  time: "8:00 - 8:30 Uhr, 17:00 - 17:30 Uhr",
  frequency: "2x täglich - morgen / abends",
  notes: "Unsere Katze Mimi braucht zweimal täglich Futter und frisches Wasser. Sie liebt es am Fenster zu sitzen.",
  type: "Bezahlt" as const,
  status: "assigned" as const,
  sitterName: "Sandra", // Updated sitterName to "Sandra" (without "M.") so getSitterByName() can find the profile
  sitterLocation: "Zürich",
  sitterDistance: "0.5 km",
  sitterRating: 4.9,
  sitterReviews: 28,
  createdAt: "2025-06-01T10:00:00.000Z",
}

export default function MyAbsencesPage() {
  const router = useRouter() // Added useRouter for navigation
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { absences, addAbsence } = useAbsences()

  const allAbsences = [DEMO_ABSENCE, ...absences]

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    time: "",
    frequency: "2x täglich - morgen / abends",
    notes: "",
    type: "Tausch" as "Tausch" | "Bezahlt",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDates = formData.endDate
      ? `${new Date(formData.startDate).toLocaleDateString("de-CH", { day: "numeric", month: "numeric", year: "2-digit" })} - ${new Date(formData.endDate).toLocaleDateString("de-CH", { day: "numeric", month: "numeric", year: "2-digit" })}`
      : new Date(formData.startDate).toLocaleDateString("de-CH", { day: "numeric", month: "numeric", year: "2-digit" })

    addAbsence({
      userId: "current-user",
      title: formData.title,
      dates: formattedDates,
      time: formData.time,
      frequency: formData.frequency,
      notes: formData.notes,
      type: formData.type,
      status: "open",
    })

    setIsModalOpen(false)
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      time: "",
      frequency: "2x täglich - morgen / abends",
      notes: "",
      type: "Tausch",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-4">
        <Link href="/sitter">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <main className="px-4 pb-6 max-w-screen-xl mx-auto">
        <h1 className="text-xl font-bold mb-3 text-balance">Ich suche Sitter am...</h1>

        <Button
          variant="default"
          className="mb-6 h-11 text-base font-normal gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          Abwesenheit erfassen
          <Plus className="w-4 h-4" />
        </Button>

        <div className="border-t border-gray-200 mb-6" />

        <h2 className="text-2xl font-bold mb-4">Meine Abwesenheiten</h2>

        <div className="divide-y">
          {allAbsences.length === 0 && <p className="text-muted-foreground">Noch keine Abwesenheiten erfasst.</p>}
          {allAbsences.map((absence) => (
            <div
              key={absence.id}
              className="py-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors -mx-4 px-4"
              onClick={() => router.push(`/sitter/my-absences/${absence.id}`)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{absence.title}</h3>
                  <span className="bg-[#5682D3] text-white px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                    {absence.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${absence.status === "assigned" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="text-sm font-medium">
                    {absence.status === "assigned" ? absence.sitterName : "Offen"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{absence.dates}</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{absence.frequency}</span>
                </div>

                {absence.status !== "assigned" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 h-9 text-sm bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/sitter/my-absences/${absence.id}/available-sitters`)
                    }}
                  >
                    Verfügbare Sitter anzeigen
                  </Button>
                )}
              </div>

              <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in" onClick={() => setIsModalOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-lg animate-in slide-in-from-bottom duration-300">
            <div className="p-6 max-w-screen-xl mx-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Neue Abwesenheit</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    placeholder="z.B. Sommerferien"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Von Datum</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Bis Datum (optional)</Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Uhrzeit (optional)</Label>
                  <Input
                    id="time"
                    placeholder="z.B. 8:00 - 8:30 Uhr, 17:00 - 17:30 Uhr"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Häufigkeit</Label>
                  <Input
                    id="frequency"
                    placeholder="z.B. 2x täglich - morgen / abends"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notizen</Label>
                  <Textarea
                    id="notes"
                    placeholder="Wichtige Informationen für den Sitter..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Typ</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.type === "Tausch" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: "Tausch" })}
                    >
                      Tausch
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === "Bezahlt" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setFormData({ ...formData, type: "Bezahlt" })}
                    >
                      Bezahlt
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button type="submit" className="flex-1">
                    Speichern
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
