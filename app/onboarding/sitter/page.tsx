"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

type ServiceType = "tausch" | "bezahlen"

export default function OnboardingSitter() {
  const router = useRouter()
  const [serviceType, setServiceType] = useState<ServiceType>("tausch")
  const [formData, setFormData] = useState({
    services: {
      feeding: false,
      overnight: false,
      medical: false,
    },
    priceOneVisit: "",
    priceTwoVisits: "",
  })

  const handleContinue = () => {
    localStorage.setItem("onboarding_sitter", JSON.stringify({ ...formData, serviceType }))
    localStorage.setItem(
      "miauzly_service_settings",
      JSON.stringify({
        type: serviceType,
        priceOneVisit: formData.priceOneVisit,
        priceTwoVisits: formData.priceTwoVisits,
      }),
    )
    router.push("/onboarding/done")
  }

  return (
    <OnboardingLayout currentStep={6} useCard={false}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-2">🐾</div>
          <h1 className="text-3xl font-bold">Deine Katzensitter-Infos</h1>
          <p className="text-muted-foreground">Welche Dienste möchtest du anbieten?</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Wie möchtest du die App nutzen?</Label>
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

          <div className="space-y-4">
            <Label className="text-base font-semibold">Biete an:</Label>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="feeding"
                  checked={formData.services.feeding}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, feeding: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="feeding" className="cursor-pointer">
                  Füttern
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="overnight"
                  checked={formData.services.overnight}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, overnight: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="overnight" className="cursor-pointer">
                  Übernachtung
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="medical"
                  checked={formData.services.medical}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      services: { ...formData.services, medical: checked as boolean },
                    })
                  }
                />
                <Label htmlFor="medical" className="cursor-pointer">
                  Medizinische Pflege
                </Label>
              </div>
            </div>
          </div>

          {serviceType === "bezahlen" && (
            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Deine Preise</Label>

              <div className="space-y-2">
                <Label htmlFor="priceOneVisit">Preis für 1 Besuch pro Tag</Label>
                <div className="relative">
                  <Input
                    id="priceOneVisit"
                    type="number"
                    placeholder="0.00"
                    value={formData.priceOneVisit}
                    onChange={(e) => setFormData({ ...formData, priceOneVisit: e.target.value })}
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
                    value={formData.priceTwoVisits}
                    onChange={(e) => setFormData({ ...formData, priceTwoVisits: e.target.value })}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Zurück
          </Button>
          <Button size="lg" className="flex-1" onClick={handleContinue}>
            Profil fertigstellen
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
