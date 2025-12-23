"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Trash2, Edit, MessageCircle, Star, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useAbsences } from "@/lib/hooks/use-absences"
import { getSitterByName } from "@/lib/sitter-data"

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
  sitterName: "Sandra",
  sitterLocation: "Zürich",
  sitterDistance: "0.5 km",
  sitterRating: 4.9,
  sitterReviews: 28,
  createdAt: "2025-06-01T10:00:00.000Z",
}

export default function AbsenceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const absenceId = params.id
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedAbsence, setEditedAbsence] = useState<typeof DEMO_ABSENCE | null>(null)
  const { absences, deleteAbsence, updateAbsence } = useAbsences()

  const absence = absenceId === "demo-sommerferien" ? DEMO_ABSENCE : absences.find((a) => a.id === absenceId)

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
  }, [showProfileModal])

  useEffect(() => {
    if (isEditing && absence) {
      setEditedAbsence({ ...absence } as any)
    }
  }, [isEditing, absence])

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const sitterProfile = absence?.sitterName ? getSitterByName(absence.sitterName) : null

  const hasSitter = absence?.sitterName && absence.sitterName.trim() !== ""

  const handleDelete = () => {
    if (absenceId === "demo-sommerferien") {
      setShowDeleteConfirm(false)
      return
    }
    deleteAbsence(absenceId)
    setShowDeleteConfirm(false)
    router.push("/sitter/my-absences")
  }

  const handleSave = () => {
    if (absenceId === "demo-sommerferien" || !editedAbsence) {
      setIsEditing(false)
      return
    }
    updateAbsence(absenceId, editedAbsence)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedAbsence(null)
  }

  if (!absence) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Abwesenheit nicht gefunden</p>
      </div>
    )
  }

  const displayAbsence = isEditing && editedAbsence ? editedAbsence : absence

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header with Back Button */}
      <div className="px-4 py-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/sitter/my-absences")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsEditing(true)}>
                <Edit className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-destructive hover:text-destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Abbrechen
              </Button>
              <Button size="sm" onClick={handleSave}>
                Speichern
              </Button>
            </>
          )}
        </div>
      </div>

      <main className="px-4 max-w-screen-xl mx-auto">
        {isEditing && editedAbsence ? (
          <input
            type="text"
            value={editedAbsence.title}
            onChange={(e) => setEditedAbsence({ ...editedAbsence, title: e.target.value })}
            className="text-3xl font-bold mb-6 w-full bg-muted/50 px-3 py-2 rounded-lg border-2 border-primary focus:outline-none"
          />
        ) : (
          <h1 className="text-3xl font-bold mb-6 text-balance">{displayAbsence.title}</h1>
        )}

        <div className="space-y-6">
          {hasSitter && sitterProfile && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Sitter</h2>
              <div className="flex items-center gap-4">
                <Image
                  src={sitterProfile.avatar || "/placeholder.svg"}
                  alt={absence.sitterName || "Sitter"}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{absence.sitterName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Bestätigt</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary"
                  onClick={() => setShowProfileModal(true)}
                >
                  Details
                </Button>
              </div>
            </div>
          )}

          {!hasSitter && (
            <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-medium">Noch kein Sitter gefunden</span>
            </div>
          )}

          {/* Date */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Datum</h2>
            {isEditing && editedAbsence ? (
              <input
                type="text"
                value={editedAbsence.dates}
                onChange={(e) => setEditedAbsence({ ...editedAbsence, dates: e.target.value })}
                placeholder="z.B. 15.07.25 - 29.07.25"
                className="w-full bg-muted/50 px-3 py-2 rounded-lg border-2 border-primary focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span>{displayAbsence.dates}</span>
              </div>
            )}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Uhrzeit</h2>
            {isEditing && editedAbsence ? (
              <input
                type="text"
                value={editedAbsence.time || ""}
                onChange={(e) => setEditedAbsence({ ...editedAbsence, time: e.target.value })}
                placeholder="z.B. 8:00 - 8:30 Uhr (optional)"
                className="w-full bg-muted/50 px-3 py-2 rounded-lg border-2 border-primary focus:outline-none"
              />
            ) : displayAbsence.time ? (
              <>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{displayAbsence.time}</span>
                </div>
                {displayAbsence.frequency && (
                  <p className="text-sm text-muted-foreground ml-8">{displayAbsence.frequency}</p>
                )}
              </>
            ) : null}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Notizen</h2>
            {isEditing && editedAbsence ? (
              <textarea
                value={editedAbsence.notes}
                onChange={(e) => setEditedAbsence({ ...editedAbsence, notes: e.target.value })}
                rows={4}
                className="w-full bg-muted/50 px-3 py-2 rounded-lg border-2 border-primary focus:outline-none resize-none"
              />
            ) : (
              <p className="text-foreground leading-relaxed">{displayAbsence.notes}</p>
            )}
          </div>

          {!isEditing && (
            <>
              {hasSitter && (
                <Button
                  className="w-full h-12 text-base"
                  size="lg"
                  onClick={() => router.push(`/sitter/connect/${absence.sitterName?.toLowerCase()}/message`)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {absence.sitterName} kontaktieren
                </Button>
              )}

              {!hasSitter && (
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-transparent"
                  size="lg"
                  onClick={() => router.push(`/sitter/my-absences/${absenceId}/available-sitters`)}
                >
                  Verfügbare Sitter anzeigen
                </Button>
              )}
            </>
          )}
        </div>
      </main>

      {showDeleteConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl shadow-lg p-6 max-w-sm w-full animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-4">Möchtest du wirklich löschen?</h3>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowDeleteConfirm(false)}>
                  Abbrechen
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                  Löschen
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {showProfileModal && sitterProfile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
            onClick={() => setShowProfileModal(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold">Profil</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowProfileModal(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
              {/* Photo Gallery */}
              <div className="relative w-full aspect-[8/5]">
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {sitterProfile.photos.map((photo, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0 snap-center">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${sitterProfile.name}'s photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentPhotoIndex + 1}/{sitterProfile.photos.length}
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-current text-yellow-500" />
                    <span className="text-xl font-semibold">
                      {sitterProfile.rating} ({sitterProfile.reviewCount})
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#5682D3] text-white text-xs font-medium">
                    {sitterProfile.type}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4">{sitterProfile.name}</h3>

                <p className="text-base leading-relaxed mb-6">{sitterProfile.description}</p>

                <div className="flex items-start gap-3 mb-8 text-muted-foreground">
                  <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{sitterProfile.location}</span>
                </div>

                {/* Cats Section */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-4">Katzen</h4>
                  <p className="text-muted-foreground mb-4">Hauskatzen/Wildkatzen</p>

                  <div className="flex gap-6">
                    {sitterProfile.cats.map((cat, index) => (
                      <div key={index} className="text-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                          <Image src={cat.photo || "/placeholder.svg"} alt={cat.name} fill className="object-cover" />
                        </div>
                        <p className="font-semibold">
                          {cat.name}, {cat.age}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <Button
                  className="w-full text-lg"
                  size="lg"
                  onClick={() => router.push(`/sitter/connect/${sitterProfile.name.toLowerCase()}/message`)}
                >
                  Kontaktieren
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
