"use client"

import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect } from "react"

type ServiceType = "tausch" | "bezahlen"

interface ServiceSettings {
  type: ServiceType
  priceOneVisit: string
  priceTwoVisits: string
}

export default function ServiceTypePage() {
  const router = useRouter()
  const [serviceType, setServiceType] = useState<ServiceType>("tausch")
  const [priceOneVisit, setPriceOneVisit] = useState("")
  const [priceTwoVisits, setPriceTwoVisits] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("miauzly_service_settings")
    if (stored) {
      const settings: ServiceSettings = JSON.parse(stored)
      setServiceType(settings.type)
      setPriceOneVisit(settings.priceOneVisit)
      setPriceTwoVisits(settings.priceTwoVisits)
    }
  }, [])

  const handleSave = () => {
    const settings: ServiceSettings = {
      type: serviceType,
      priceOneVisit,
      priceTwoVisits,
    }
    localStorage.setItem("miauzly_service_settings", JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Sitter-Typ</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Wie möchtest du die App nutzen?</h2>
            <div className="space-y-3">
              <button
                onClick={() => setServiceType("tausch")}
                className={`w-full p-4 border-2 rounded-lg transition-all ${
                  serviceType === "tausch" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-left flex-1">
                    <p className="font-semibold">Tausch</p>
                    <p className="text-sm text-muted-foreground">Gegenseitige Katzenbetreuung ohne Bezahlung</p>
                  </div>
                  {serviceType === "tausch" && <Check className="w-6 h-6 text-primary flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => setServiceType("bezahlen")}
                className={`w-full p-4 border-2 rounded-lg transition-all ${
                  serviceType === "bezahlen" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-left flex-1">
                    <p className="font-semibold">Bezahlen</p>
                    <p className="text-sm text-muted-foreground">Ich biete bezahlte Katzenbetreuung an</p>
                  </div>
                  {serviceType === "bezahlen" && <Check className="w-6 h-6 text-primary flex-shrink-0" />}
                </div>
              </button>
            </div>
          </div>

          {serviceType === "bezahlen" && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Deine Preise</h3>

              <div className="space-y-2">
                <Label htmlFor="priceOneVisit">Preis für 1 Besuch pro Tag</Label>
                <div className="relative">
                  <Input
                    id="priceOneVisit"
                    type="number"
                    placeholder="0.00"
                    value={priceOneVisit}
                    onChange={(e) => setPriceOneVisit(e.target.value)}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceTwoVisits">Preis für 2 Besuche pro Tag</Label>
                <div className="relative">
                  <Input
                    id="priceTwoVisits"
                    type="number"
                    placeholder="0.00"
                    value={priceTwoVisits}
                    onChange={(e) => setPriceTwoVisits(e.target.value)}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            {saved ? "Gespeichert!" : "Speichern"}
          </Button>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
