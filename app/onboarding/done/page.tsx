"use client"

import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function OnboardingDone() {
  const router = useRouter()
  const [role, setRole] = useState<string>("")
  const [saving, setSaving] = useState(true)

  useEffect(() => {
    saveOnboardingData()
  }, [])

  const saveOnboardingData = async () => {
    try {
      const accountData = JSON.parse(localStorage.getItem("onboarding_account") || "{}")
      const profileData = JSON.parse(localStorage.getItem("onboarding_profile") || "{}")
      const roleData = localStorage.getItem("onboarding_role") || "both"
      const serviceSettings = JSON.parse(localStorage.getItem("onboarding_service_settings") || "{}")
      const userEmail = localStorage.getItem("userEmail") || ""

      setRole(roleData)

      const address = [profileData.street, profileData.zip, profileData.city, profileData.country]
        .filter(Boolean)
        .join(", ")

      const profile = {
        email: userEmail,
        nickname: accountData.nickname,
        first_name: accountData.firstName,
        last_name: accountData.lastName,
        phone: profileData.phone,
        address: address || null,
        avatar: profileData.profileImage || null,
        role: roleData,
        service_type: serviceSettings.type || "tausch",
        price_one_visit: serviceSettings.priceOneVisit || null,
        price_two_visits: serviceSettings.priceTwoVisits || null,
        bio: profileData.bio || null,
        offers_feeding: serviceSettings.offers_feeding || false,
        offers_overnight: serviceSettings.offers_overnight || false,
        offers_medical: serviceSettings.offers_medical || false,
        created_at: new Date().toISOString(),
      }

      localStorage.setItem("userProfile", JSON.stringify(profile))
      localStorage.setItem("currentUser", JSON.stringify({ email: userEmail, profile }))

      localStorage.removeItem("onboarding_account")
      localStorage.removeItem("onboarding_profile")
      localStorage.removeItem("onboarding_role")
      localStorage.removeItem("onboarding_service_settings")

      setSaving(false)
    } catch (err: any) {
      console.error("Error saving onboarding data:", err)
      setSaving(false)
    }
  }

  const handleGoToDashboard = () => {
    router.push("/")
  }

  const handleGoToProfile = () => {
    router.push("/profile")
  }

  if (saving) {
    return (
      <OnboardingLayout currentStep={7} useCard={false}>
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-[#FFAD08] rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl">💾</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Dein Profil wird erstellt...</h1>
          <p className="text-muted-foreground">Einen Moment bitte</p>
        </div>
      </OnboardingLayout>
    )
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
