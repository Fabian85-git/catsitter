"use client"

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, List, CalendarIcon, ChevronLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function TerminePage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState(13)
  const [currentMonth, setCurrentMonth] = useState("November 2025")

  const getAppointments = () => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("appointments")
    if (!stored) {
      // Initialize with default appointments
      const defaultAppointments = [
        {
          id: "1",
          date: "28. September 2025",
          day: 28,
          month: 9,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "2",
          date: "30. September 2025",
          day: 30,
          month: 9,
          time: "8:00 - 8:30 Uhr\n17:00 - 17:30 Uhr",
          type: "sitting",
          person: "Tommy",
          image: "/grey-tabby-cat-face.jpg",
          cats: "El Negro 🐱",
          note: "Notiz: 2x nur füttern",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "3",
          date: "11. Oktober 2025",
          day: 11,
          month: 10,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "4",
          date: "2. November 2025",
          day: 2,
          month: 11,
          time: "2x täglich",
          type: "being-sat",
          person: "Sandra",
          image: "/blonde-woman-portrait.png",
          color: "pink",
          status: "confirmed",
        },
        {
          id: "5",
          date: "3. November 2025",
          day: 3,
          month: 11,
          time: "2x täglich",
          type: "being-sat",
          person: "Charly",
          image: "/dark-haired-man.png",
          color: "pink",
          status: "confirmed",
        },
        {
          id: "6",
          date: "12. November 2025",
          day: 12,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "7",
          date: "13. November 2025",
          day: 13,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "8",
          date: "28. November 2025",
          day: 28,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "9",
          date: "30. November 2025",
          day: 30,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Anna",
          image: "/smiling-brown-haired-woman.png",
          cats: "Blanca & Bionda 🐱 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "10",
          date: "6. November 2025",
          day: 6,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Tommy",
          image: "/grey-tabby-cat-face.jpg",
          cats: "El Negro 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "11",
          date: "9. November 2025",
          day: 9,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "sitting",
          person: "Tommy",
          image: "/grey-tabby-cat-face.jpg",
          cats: "El Negro 🐱",
          color: "blue",
          status: "confirmed",
        },
        {
          id: "12",
          date: "15. November 2025",
          day: 15,
          month: 11,
          time: "9:00 - 10:00 Uhr",
          type: "pending-booking",
          person: "John",
          image: "/businessman.png",
          cats: "Charlie 🐱",
          color: "orange",
          status: "pending",
        },
      ]
      localStorage.setItem("appointments", JSON.stringify(defaultAppointments))
      return defaultAppointments
    }
    return JSON.parse(stored)
  }

  const appointments = getAppointments()

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((apt) => apt.day === day && apt.month === 11)
  }

  const calendarDays = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
  ]

  const selectedAppointments = getAppointmentsForDay(selectedDate)

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Deine Termine</h1>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className={`p-2 border-l-8 shadow-xs ${
                  appointment.color === "blue"
                    ? "border-l-[#5682D3]"
                    : appointment.color === "pink"
                      ? "border-l-pink-500"
                      : "border-l-orange-500"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-semibold text-lg">{appointment.date}</p>
                    {appointment.status === "pending" && (
                      <p className="text-xs text-orange-600 font-medium mt-1">⏳ Noch nicht bestätigter Termin</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium whitespace-pre-line">{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={appointment.image || "/placeholder.svg"}
                      alt={appointment.person}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    {appointment.type === "sitting" ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Sitting bei <span className="font-semibold text-foreground">{appointment.person}</span>
                        </p>
                        <p className="text-sm">{appointment.cats}</p>
                        {appointment.note && (
                          <p className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">{appointment.note}</p>
                        )}
                      </>
                    ) : appointment.type === "being-sat" ? (
                      <p className="font-semibold text-foreground">{appointment.person}</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Buchungsanfrage bei{" "}
                          <span className="font-semibold text-foreground">{appointment.person}</span>
                        </p>
                        <p className="text-sm">{appointment.cats}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link href={`/termine/${appointment.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1 h-8">
                      Details
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Calendar header with month navigation */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{currentMonth}</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="bg-background rounded-lg">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayObj, i) => {
                  const dayAppointments = dayObj.isCurrentMonth ? getAppointmentsForDay(dayObj.day) : []
                  const hasBlueAppointment = dayAppointments.some((apt) => apt.color === "blue")
                  const hasPinkAppointment = dayAppointments.some((apt) => apt.color === "pink")
                  const hasOrangeAppointment = dayAppointments.some((apt) => apt.color === "orange")
                  const isSelected = dayObj.day === selectedDate && dayObj.isCurrentMonth

                  return (
                    <button
                      key={i}
                      onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.day)}
                      className={`
                        aspect-square flex flex-col items-center justify-center rounded-lg text-lg relative
                        ${!dayObj.isCurrentMonth ? "text-muted-foreground" : "text-foreground"}
                        ${isSelected ? "bg-muted" : "hover:bg-muted/50"}
                      `}
                    >
                      <span>{dayObj.day}</span>
                      {dayObj.isCurrentMonth && (hasBlueAppointment || hasPinkAppointment || hasOrangeAppointment) && (
                        <div className="flex gap-1 absolute bottom-1">
                          {hasBlueAppointment && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                          {hasPinkAppointment && <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
                          {hasOrangeAppointment && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upcoming appointments for selected date */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Nächste Termine</h3>
              {selectedAppointments.length > 0 ? (
                <div className="space-y-4">
                  {selectedAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 bg-muted">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-lg">{appointment.date}</p>
                          {appointment.status === "pending" && (
                            <p className="text-xs text-orange-600 font-medium mt-1">⏳ Noch nicht bestätigter Termin</p>
                          )}
                        </div>
                        <p className="text-sm font-medium">{appointment.time}</p>
                      </div>
                      {appointment.type === "sitting" && <p className="text-sm mb-3">Sitten bei {appointment.cats}</p>}
                      {appointment.type === "pending-booking" && (
                        <p className="text-sm mb-3">Buchungsanfrage bei {appointment.person}</p>
                      )}
                      <div className="flex justify-end">
                        <Link href={`/termine/${appointment.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            Details
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Keine Termine an diesem Tag</p>
              )}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
