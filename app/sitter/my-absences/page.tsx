"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Plus, ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function MyAbsencesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [absences, setAbsences] = useState([
    {
      id: 1,
      title: "Wanderweekend",
      status: "assigned",
      sitterName: "Sandra",
      dates: "2.-3.11.2025",
      frequency: "2x täglich - morgen / abends",
      notes: "Notiz: Nassfutter und Brekkies oder so...",
      type: "Tausch",
    },
    {
      id: 2,
      title: "Neujahr",
      status: "open",
      dates: "28.12.25 - 2.1.26",
      frequency: "2x täglich - morgen / abends",
      notes: "Notiz: Nassfutter und Brekkies oder so...",
      type: "Tausch",
    },
    {
      id: 3,
      title: "Städtetrip",
      status: "open",
      dates: "19.1.-23.1.2026",
      frequency: "2x täglich - morgen / abends",
      notes: "Notiz: Nassfutter und Brekkies oder so...",
      type: "Tausch",
    },
  ])

  const [formData, setFormData] = useState({
    title: "",
    dates: "",
    frequency: "2x täglich - morgen / abends",
    notes: "",
    type: "Tausch",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAbsence = {
      id: absences.length + 1,
      title: formData.title,
      status: "open",
      dates: formData.dates,
      frequency: formData.frequency,
      notes: formData.notes,
      type: formData.type,
    }
    setAbsences([newAbsence, ...absences])
    setIsModalOpen(false)
    // Reset form
    setFormData({
      title: "",
      dates: "",
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
        <h1 className="text-xl font-bold mb-6 text-balance">Ich suche Sitter am...</h1>

        <Button
          variant="default"
          className="w-full max-w-sm mb-6 h-12 text-base font-normal justify-between"
          onClick={() => setIsModalOpen(true)}
        >
          Abwesenheit erfassen
          <Plus className="w-5 h-5 ml-2" />
        </Button>

        <h2 className="text-2xl font-bold mb-4">Meine Abwesenheiten</h2>

        <div className="space-y-6">
          {absences.map((absence, index) => (
            <div key={absence.id}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{absence.title}</h3>
                  <span className="bg-[#5682D3] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
                    {absence.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${absence.status === "assigned" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span className="font-medium">{absence.status === "assigned" ? absence.sitterName : "Offen"}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>{absence.dates}</span>
                </div>

                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{absence.frequency}</span>
                </div>

                <p className="text-foreground">{absence.notes}</p>

                {absence.status === "open" && (
                  <Link href={`/sitter/my-absences/${absence.id}/available-sitters`}>
                    <Button variant="outline" className="w-full max-w-md h-12 justify-between bg-transparent">
                      Verfügbare Sitter anzeigen
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}

                <div className="flex justify-end">
                  <Link href={`/sitter/my-absences/${absence.id}`}>
                    <Button variant="ghost" className="flex items-center gap-2 h-auto px-2">
                      <span className="text-sm">Details</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {index < absences.length - 1 && <div className="border-t mt-6" />}
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
                  <Label htmlFor="dates">Datum</Label>
                  <Input
                    id="dates"
                    placeholder="z.B. 15.-20.8.2025"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    required
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
