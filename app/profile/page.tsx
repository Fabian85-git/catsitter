"use client"

import { ArrowLeft, ChevronRight, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const [sittingType, setSittingType] = useState<"tausch" | "bezahlt">("tausch")
  const [userData, setUserData] = useState({
    nickname: "CatLover123",
    firstName: "Anna",
    lastName: "Müller",
    email: "anna.mueller@example.com",
    street: "Bahnhofstrasse 123",
    zip: "8001",
    city: "Zürich",
    country: "Schweiz",
    phone: "+41 79 123 45 67",
    profileImage: null as string | null,
  })

  useEffect(() => {
    const savedType = localStorage.getItem("sittingType") as "tausch" | "bezahlt" | null
    if (savedType) setSittingType(savedType)

    const accountData = localStorage.getItem("onboarding_account")
    const profileData = localStorage.getItem("onboarding_profile")

    if (accountData) {
      const account = JSON.parse(accountData)
      setUserData((prev) => ({
        ...prev,
        nickname: account.nickname || prev.nickname,
        firstName: account.firstName || prev.firstName,
        lastName: account.lastName || prev.lastName,
        email: account.email || prev.email,
      }))
    }

    if (profileData) {
      const profile = JSON.parse(profileData)
      setUserData((prev) => ({
        ...prev,
        street: profile.street || prev.street,
        zip: profile.zip || prev.zip,
        city: profile.city || prev.city,
        country: profile.country || prev.country,
        phone: profile.phone || prev.phone,
        profileImage: profile.profileImage || prev.profileImage,
      }))
    }
  }, [])

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.clear()
    // Redirect to onboarding
    router.push("/onboarding")
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
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {userData.profileImage ? (
              <Image
                src={userData.profileImage || "/placeholder.svg"}
                alt="Profilbild"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Nickname</p>
            <p className="text-xl font-bold">{userData.nickname}</p>
          </div>
        </div>

        {/* Personal Information */}
        <Card className="p-4 space-y-4">
          <h2 className="font-semibold text-lg mb-3">Persönliche Daten</h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {userData.firstName} {userData.lastName}
              </p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">{userData.street}</p>
              <p className="font-medium">
                {userData.zip} {userData.city}
              </p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">E-Mail</p>
              <p className="font-medium">{userData.email}</p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{userData.phone || "Nicht angegeben"}</p>
            </div>
          </div>
        </Card>

        {/* Settings Links */}
        <Card className="divide-y">
          <Link href="/profile/password" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Passwort ändern</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/messages" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Nachrichten</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/payment" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">Zahlungsmittel</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/sitting" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <span className="font-medium">
                Sitten{" "}
                <span className="text-muted-foreground">({sittingType === "tausch" ? "Tausch" : "Bezahlt"})</span>
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          <Link href="/profile/gallery" className="block">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
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
