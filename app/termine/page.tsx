"use client"

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { ChevronRight, List, CalendarIcon, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TerminePage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState(13)
  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10) // 10 = November (0-indexed)

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ]

  const currentMonth = `${monthNames[currentMonthIndex]} ${currentYear}`

  const goToPreviousMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1)
    }
  }

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((apt) => apt.day === day && apt.month === currentMonthIndex + 1)
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonthIndex, currentYear)
    const days = []

    // Add previous month's trailing days
    const prevMonthDays = getDaysInMonth(currentMonthIndex - 1, currentYear)
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false })
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true })
    }

    // Add next month's leading days to fill the grid
    const remainingDays = 35 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

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
          <div className="divide-y">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="py-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors -mx-4 px-4"
                onClick={() => router.push(`/termine/${appointment.id}`)}
              >
                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={appointment.image || "/placeholder.svg"}
                    alt={appointment.person}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-lg font-semibold">{appointment.date}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                        appointment.color === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : appointment.color === "pink"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {appointment.type === "sitting"
                        ? "Sitting"
                        : appointment.type === "being-sat"
                          ? "Wird gesittet"
                          : "Anfrage"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{appointment.time}</p>
                  {appointment.type === "sitting" ? (
                    <p className="text-sm text-foreground">
                      bei <span className="font-medium">{appointment.person}</span> • {appointment.cats}
                    </p>
                  ) : appointment.type === "being-sat" ? (
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{appointment.person}</span> sittet deine Katze
                    </p>
                  ) : (
                    <p className="text-sm text-foreground">
                      Buchungsanfrage bei <span className="font-medium">{appointment.person}</span>
                    </p>
                  )}
                  {appointment.status === "pending" && (
                    <p className="text-xs text-orange-600 font-medium mt-1">⏳ Noch nicht bestätigt</p>
                  )}
                </div>

                <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{currentMonth}</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full bg-muted" onClick={goToPreviousMonth}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-muted" onClick={goToNextMonth}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-lg">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

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

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Nächste Termine</h3>
              {selectedAppointments.length > 0 ? (
                <div className="divide-y">
                  {selectedAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="py-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors -mx-4 px-4"
                      onClick={() => router.push(`/termine/${appointment.id}`)}
                    >
                      <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={appointment.image || "/placeholder.svg"}
                          alt={appointment.person}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-lg font-semibold">{appointment.date}</p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                              appointment.color === "blue"
                                ? "bg-blue-100 text-blue-700"
                                : appointment.color === "pink"
                                  ? "bg-pink-100 text-pink-700"
                                  : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {appointment.type === "sitting"
                              ? "Sitting"
                              : appointment.type === "being-sat"
                                ? "Wird gesittet"
                                : "Anfrage"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{appointment.time}</p>
                        {appointment.type === "sitting" ? (
                          <p className="text-sm text-foreground">
                            bei <span className="font-medium">{appointment.person}</span> • {appointment.cats}
                          </p>
                        ) : appointment.type === "being-sat" ? (
                          <p className="text-sm text-foreground">
                            <span className="font-medium">{appointment.person}</span> sittet deine Katze
                          </p>
                        ) : (
                          <p className="text-sm text-foreground">
                            Buchungsanfrage bei <span className="font-medium">{appointment.person}</span>
                          </p>
                        )}
                        {appointment.status === "pending" && (
                          <p className="text-xs text-orange-600 font-medium mt-1">⏳ Noch nicht bestätigt</p>
                        )}
                      </div>

                      <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    </div>
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
