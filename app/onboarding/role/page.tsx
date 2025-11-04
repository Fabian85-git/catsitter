"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

type Role = "sitter" | "owner" | "both" | null

export default function OnboardingRole() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role>(null)

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem("onboarding_role", selectedRole)
      router.push("/onboarding/account")
    }
  }

  const roles = [
    {
      id: "sitter" as Role,
      icon: "🐾",
      title: "Ich möchte Katzensitter werden",
      description: "Biete deine Dienste als Katzensitter an und verdiene Geld",
    },
    {
      id: "owner" as Role,
      icon: "🏡",
      title: "Ich suche einen Katzensitter",
      description: "Finde vertrauenswürdige Sitter für deine Katze",
    },
    {
      id: "both" as Role,
      icon: "🐱",
      title: "Beides - Katzenbesitzer und möchte sitten",
      description: "Nutze alle Funktionen der Plattform",
    },
  ]

  return (
    <OnboardingLayout currentStep={2}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Wie möchtest du Miauzly nutzen?</h1>
          <p className="text-muted-foreground">Wähle deine Rolle aus. Du kannst dies später jederzeit ändern.</p>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${
                selectedRole === role.id ? "border-primary bg-primary/5 ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{role.icon}</div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                {selectedRole === role.id && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Zurück
          </Button>
          <Button size="lg" className="flex-1" disabled={!selectedRole} onClick={handleContinue}>
            Weiter
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
