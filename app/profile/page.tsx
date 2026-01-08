"use client"

import { ArrowLeft, ChevronRight, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [serviceType, setServiceType] = useState<string>("Tausch")
  const [role, setRole] = useState<string>("")
  const [priceOneVisit, setPriceOneVisit] = useState<string>("")
  const [priceTwoVisits, setPriceTwoVisits] = useState<string>("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")

      if (!currentUser) {
        router.push("/auth/login")
        return
      }

      const profileData = JSON.parse(localStorage.getItem("userProfile") || "null")

      if (!profileData) {
        router.push("/onboarding/role")
        return
      }

      setProfile(profileData)

      const serviceSettings = JSON.parse(localStorage.getItem("miauzly_service_settings") || "null")
      if (serviceSettings) {
        setServiceType(serviceSettings.type === "tausch" ? "Tausch" : "Bezahlen")
        setPriceOneVisit(serviceSettings.priceOneVisit)
        setPriceTwoVisits(serviceSettings.priceTwoVisits)
      } else if (profileData.service_type) {
        // Fallback to userProfile if service_settings not found
        const serviceTypes = []
        if (profileData.service_type?.includes("tausch")) serviceTypes.push("Tausch")
        if (profileData.service_type?.includes("bezahlen")) serviceTypes.push("Bezahlen")
        setServiceType(serviceTypes.join(" & ") || "Nicht angegeben")
        setPriceOneVisit(profileData.price_one_visit || "")
        setPriceTwoVisits(profileData.price_two_visits || "")
      }

      const roleDisplay =
        profileData.role === "both"
          ? "Beides"
          : profileData.role === "sitter"
            ? "Katzensitter"
            : profileData.role === "owner"
              ? "Katzenbesitzer"
              : ""
      setRole(roleDisplay)
    } catch (error) {
      console.error("Error in loadProfile:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userProfile")
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Profil wird geladen...</p>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Profil</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Profile Picture and Name Section */}
        <div className="flex flex-col items-center gap-4 py-0">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt="Profilbild"
                width={96}
                height={96}
                className="h-full object-cover w-full"
              />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Nickname</p>
            <p className="text-xl font-bold">{profile.nickname || profile.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <Card className="shadow-none">
          <div
            onClick={() => router.push("/profile/personal-data")}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors py-1.5"
          >
            <h2 className="font-medium">Persönliche Daten</h2>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>

        {/* Settings Links */}
        <Card className="divide-y my-0 py-4 shadow-none">
          <Link href="/profile/rolle" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors py-4">
              <span className="font-medium">Rolle</span>
              <div className="flex items-center gap-2">
                {role && <span className="text-sm text-muted-foreground">{role}</span>}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </Link>

          <Link href="/profile/typ" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Sitter-Typ</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{serviceType}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </Link>

          {profile.role && (profile.role === "sitter" || profile.role === "both") && (
            <>
              {serviceType === "Bezahlen" && (priceOneVisit || priceTwoVisits) && (
                <div className="p-4 border-b">
                  <span className="font-medium block mb-2">Preise</span>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {priceOneVisit && <p>1 Besuch/Tag: CHF {priceOneVisit}</p>}
                    {priceTwoVisits && <p>2 Besuche/Tag: CHF {priceTwoVisits}</p>}
                  </div>
                </div>
              )}

              <div className="p-4">
                <span className="font-medium block mb-2">Ich biete an</span>
                <div className="text-sm text-muted-foreground space-y-1">
                  {profile.offers_feeding && <p>✓ Füttern</p>}
                  {profile.offers_overnight && <p>✓ Übernachtung</p>}
                  {profile.offers_medical && <p>✓ Medizinische Pflege</p>}
                  {!profile.offers_feeding && !profile.offers_overnight && !profile.offers_medical && (
                    <p className="text-muted-foreground/60">Keine Angebote ausgewählt</p>
                  )}
                </div>
              </div>
            </>
          )}

          <Link href="/profile/payment" className="block">
            <div className="flex justify-between p-4 hover:bg-muted/50 transition-colors items-center">
              <span className="font-medium">Zahlungsmittel</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/gallery" className="block">
            <div className="flex justify-between p-4 hover:bg-muted/50 transition-colors items-center">
              <span className="font-medium">Fotogalerie</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/subscription" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Abo verwalten</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/password" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Passwort ändern</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        </Card>

        <div className="pt-4 pb-6">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
