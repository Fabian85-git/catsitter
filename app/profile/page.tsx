"use client"

import { ArrowLeft, ChevronRight, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useUserProfile } from "@/lib/hooks/use-user-profile"
import { userProfileStore } from "@/lib/data-store"
import Image from "next/image"
import { useEffect } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const { profile, updateProfile, clearProfile } = useUserProfile()

  useEffect(() => {
    const currentProfile = userProfileStore.get()
    if (!currentProfile || currentProfile.nickname !== "fabifabi") {
      userProfileStore.resetToDefaults()
      window.location.reload()
    }
  }, [])

  const handleLogout = () => {
    clearProfile()
    router.push("/onboarding")
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Profil wird geladen...</p>
      </div>
    )
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
            {profile.avatar ? (
              <Image
                src={profile.avatar || "/placeholder.svg"}
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
            <p className="text-xl font-bold">{profile.nickname}</p>
          </div>
        </div>

        {/* Personal Information */}
        <Card className="p-4 space-y-4">
          <h2 className="font-semibold text-lg mb-3">Persönliche Daten</h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {profile.firstName} {profile.lastName}
              </p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">{profile.address}</p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">E-Mail</p>
              <p className="font-medium">{profile.email}</p>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{profile.phone || "Nicht angegeben"}</p>
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
