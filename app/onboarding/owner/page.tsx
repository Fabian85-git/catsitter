"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function OnboardingOwner() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    numberOfCats: "",
    description: "",
    location: "",
  })

  const handleContinue = () => {
    localStorage.setItem("onboarding_owner", JSON.stringify(formData))
    router.push("/onboarding/done")
  }

  return (
    <OnboardingLayout currentStep={6} useCard={false}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-2">🏡</div>
          <h1 className="text-3xl font-bold">Infos zu deinen Katzen</h1>
          <p className="text-muted-foreground">Erzähle uns über deine Samtpfoten</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfCats">Anzahl Katzen</Label>
            <Input
              id="numberOfCats"
              type="number"
              min="1"
              placeholder="1"
              value={formData.numberOfCats}
              onChange={(e) => setFormData({ ...formData, numberOfCats: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              placeholder="Erzähle über deine Katzen: Namen, Alter, Charakter, besondere Bedürfnisse..."
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Standort</Label>
            <Input
              id="location"
              placeholder="Wird automatisch von deiner Adresse übernommen"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Optional: Überschreibe den Standort manuell</p>
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
