"use client"

import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OnboardingDone() {
  const router = useRouter()
  const [role, setRole] = useState<string>("")

  useEffect(() => {
    const savedRole = localStorage.getItem("onboarding_role")
    setRole(savedRole || "")
  }, [])

  const handleGoToDashboard = () => {
    router.push("/")
  }

  const handleGoToProfile = () => {
    router.push("/profile")
  }

  return (
    <OnboardingLayout currentStep={7} useCard={false}>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-[#FFAD08] rounded-full flex items-center justify-center text-5xl animate-bounce">
            🎉
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Willkommen bei Miauzly!</h1>
          <p className="text-lg text-muted-foreground text-balance">
            {role === "sitter" &&
              "Dein Profil ist erstellt! Du kannst jetzt dein Angebot veröffentlichen und Katzen sitten."}
            {role === "owner" &&
              "Dein Profil ist erstellt! Du kannst jetzt nach vertrauenswürdigen Sittern für deine Katze suchen."}
            {role === "both" &&
              "Dein Profil ist erstellt! Du kannst jetzt Sitters finden oder dein Angebot veröffentlichen."}
            {!role && "Dein Profil ist erstellt! Viel Spass mit Miauzly."}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <Button size="lg" className="w-full" onClick={handleGoToDashboard}>
            Zum Dashboard
          </Button>
          <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleGoToProfile}>
            Profil ansehen
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
