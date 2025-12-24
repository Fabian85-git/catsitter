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
import { Check } from "lucide-react"

type ServiceType = "tausch" | "bezahlen"

export default function OnboardingBoth() {
  const router = useRouter()
  const [serviceType, setServiceType] = useState<ServiceType>("tausch")
  const [sitterData, setSitterData] = useState({
    services: {
      feeding: false,
      overnight: false,
      medical: false,
    },
    priceOneVisit: "",
    priceTwoVisits: "",
  })
  const [ownerData, setOwnerData] = useState({
    numberOfCats: "",
    description: "",
    location: "",
  })

  const handleContinue = () => {
    localStorage.setItem("onboarding_both", JSON.stringify({ sitterData: { ...sitterData, serviceType }, ownerData }))
    localStorage.setItem(
      "miauzly_service_settings",
      JSON.stringify({
        type: serviceType,
        priceOneVisit: sitterData.priceOneVisit,
        priceTwoVisits: sitterData.priceTwoVisits,
      }),
    )
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
                      serviceType === "bezahlen"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
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
                        value={sitterData.priceOneVisit}
                        onChange={(e) => setSitterData({ ...sitterData, priceOneVisit: e.target.value })}
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
                        value={sitterData.priceTwoVisits}
                        onChange={(e) => setSitterData({ ...sitterData, priceTwoVisits: e.target.value })}
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
                    </div>
                  </div>
                </div>
              )}
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
