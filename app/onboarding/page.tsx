"use client"

import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function OnboardingWelcome() {
  const router = useRouter()

  return (
    <OnboardingLayout currentStep={1} showLogo={false} useCard={false}>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <Image src="/miauzly-logo-blau.png" alt="Miauzly" width={200} height={60} className="h-16 w-auto" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Willkommen bei Miauzly</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Die Community für Katzenliebhaber. Finde vertrauenswürdige Katzensitter oder biete deine Dienste als Sitter
            an.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button size="lg" className="w-full" onClick={() => router.push("/onboarding/role")}>
            Registrieren
          </Button>
          <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
            Einloggen
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
