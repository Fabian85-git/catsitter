"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OnboardingBoth() {
  const router = useRouter()
  const [sitterData, setSitterData] = useState({
    services: {
      feeding: false,
      overnight: false,
      medical: false,
    },
    pricePerDay: "",
  })
  const [ownerData, setOwnerData] = useState({
    numberOfCats: "",
    description: "",
    location: "",
  })

  const handleContinue = () => {
    localStorage.setItem("onboarding_both", JSON.stringify({ sitterData, ownerData }))
    router.push("/onboarding/done")
  }

  return (
    <OnboardingLayout currentStep={6} useCard={false}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl mb-2">🐱</div>
          <h1 className="text-3xl font-bold">Deine Infos</h1>
          <p className="text-muted-foreground">Als Katzenbesitzer und Sitter</p>
        </div>

        <Tabs defaultValue="sitter" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sitter">Als Sitter</TabsTrigger>
            <TabsTrigger value="owner">Als Besitzer</TabsTrigger>
          </TabsList>

          <TabsContent value="sitter" className="space-y-4 mt-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Biete an:</Label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="feeding"
                      checked={sitterData.services.feeding}
                      onCheckedChange={(checked) =>
                        setSitterData({
                          ...sitterData,
                          services: { ...sitterData.services, feeding: checked as boolean },
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
                      checked={sitterData.services.overnight}
                      onCheckedChange={(checked) =>
                        setSitterData({
                          ...sitterData,
                          services: { ...sitterData.services, overnight: checked as boolean },
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
                      checked={sitterData.services.medical}
                      onCheckedChange={(checked) =>
                        setSitterData({
                          ...sitterData,
                          services: { ...sitterData.services, medical: checked as boolean },
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
                  value={sitterData.pricePerDay}
                  onChange={(e) => setSitterData({ ...sitterData, pricePerDay: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="owner" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfCats">Anzahl Katzen</Label>
                <Input
                  id="numberOfCats"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={ownerData.numberOfCats}
                  onChange={(e) => setOwnerData({ ...ownerData, numberOfCats: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  placeholder="Erzähle über deine Katzen..."
                  rows={5}
                  value={ownerData.description}
                  onChange={(e) => setOwnerData({ ...ownerData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Standort</Label>
                <Input
                  id="location"
                  placeholder="Wird automatisch übernommen"
                  value={ownerData.location}
                  onChange={(e) => setOwnerData({ ...ownerData, location: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
