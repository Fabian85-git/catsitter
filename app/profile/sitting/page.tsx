"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SittingPreferencesPage() {
  const router = useRouter()
  const [sittingType, setSittingType] = useState<"tausch" | "bezahlt">("tausch")
  const [dailyRate, setDailyRate] = useState("25")

  useEffect(() => {
    const savedType = localStorage.getItem("sittingType") as "tausch" | "bezahlt" | null
    const savedRate = localStorage.getItem("dailyRate")
    if (savedType) setSittingType(savedType)
    if (savedRate) setDailyRate(savedRate)
  }, [])

  const handleSave = () => {
    localStorage.setItem("sittingType", sittingType)
    localStorage.setItem("dailyRate", dailyRate)
    console.log("[v0] Saving sitting preferences:", { sittingType, dailyRate })
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Sitten Einstellungen</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Sitting Type Selection */}
        <Card className="p-4 space-y-4">
          <div>
            <h2 className="font-semibold text-lg mb-3">Art des Sittens</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Wähle aus, ob du Katzen gegen Tausch oder gegen Bezahlung sitten möchtest.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setSittingType("tausch")}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                sittingType === "tausch" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="font-semibold mb-1">Tausch</div>
              <div className="text-sm text-muted-foreground">Ich sitte deine Katzen, du sittet meine Katzen</div>
            </button>

            <button
              onClick={() => setSittingType("bezahlt")}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                sittingType === "bezahlt" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="font-semibold mb-1">Bezahltes Sitting</div>
              <div className="text-sm text-muted-foreground">Ich sitte gegen Bezahlung</div>
            </button>
          </div>
        </Card>

        {/* Daily Rate (only shown for paid sitting) */}
        {sittingType === "bezahlt" && (
          <Card className="p-4 space-y-4">
            <div>
              <h2 className="font-semibold text-lg mb-3">Tagespreis</h2>
              <p className="text-sm text-muted-foreground mb-4">Gib deinen Preis pro Tag für das Katzensitten an.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily-rate">Preis pro Tag (CHF)</Label>
              <div className="relative">
                <Input
                  id="daily-rate"
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  className="pr-12"
                  min="0"
                  step="5"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
              </div>
              <p className="text-xs text-muted-foreground">Empfohlener Preis: 20-40 CHF pro Tag</p>
            </div>
          </Card>
        )}

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" size="lg">
          Einstellungen speichern
        </Button>
      </div>
    </div>
  )
}
