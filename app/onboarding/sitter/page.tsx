"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function OnboardingSitter() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    services: {
      feeding: false,
      overnight: false,
      medical: false,
    },
    pricePerDay: "",
  })

  const handleContinue = () => {
    localStorage.setItem("onboarding_sitter", JSON.stringify(formData))
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

          <div className="space-y-2">
            <Label htmlFor="price">Preis pro Tag (CHF)</Label>
            <Input
              id="price"
              type="number"
              placeholder="25"
              value={formData.pricePerDay}
              onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Kann später in der App angepasst werden</p>
          </div>
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
