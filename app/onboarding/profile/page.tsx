"use client"

import type React from "react"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Upload, User } from "lucide-react"
import Image from "next/image"

export default function OnboardingProfile() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    street: "",
    zip: "",
    city: "",
    country: "Schweiz",
    phone: "",
    smsCode: "",
    bio: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContinue = () => {
    localStorage.setItem("onboarding_profile", JSON.stringify({ ...formData, profileImage }))
    router.push("/onboarding/verify")
  }

  return (
    <OnboardingLayout currentStep={4} useCard={false}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Profilangaben</h1>
          <p className="text-muted-foreground">Erzähle uns ein bisschen über dich</p>
        </div>

        <div className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {profileImage ? (
                <Image
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-full object-cover"
                />
              ) : (
                <div className="w-30 h-30 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <input type="file" id="profile-image" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Button variant="outline" size="sm" onClick={() => document.getElementById("profile-image")?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Profilbild hochladen
              </Button>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Adresse</h3>

            <div className="space-y-2">
              <Label htmlFor="street">Strasse und Hausnummer</Label>
              <Input
                id="street"
                placeholder="Musterstrasse 123"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip">PLZ</Label>
                <Input
                  id="zip"
                  placeholder="8000"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ort</Label>
                <Input
                  id="city"
                  placeholder="Zürich"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Land</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-4">
            <h3 className="font-semibold">Telefonnummer (optional)</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+41 79 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smsCode">SMS-Code</Label>
                <Input
                  id="smsCode"
                  placeholder="123456"
                  value={formData.smsCode}
                  onChange={(e) => setFormData({ ...formData, smsCode: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Kurzbeschreibung</Label>
            <Textarea
              id="bio"
              placeholder="Erzähle etwas über dich und deine Erfahrung mit Katzen..."
              rows={4}
              maxLength={200}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <p className="text-xs text-muted-foreground text-right">{formData.bio.length}/200</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Zurück
          </Button>
          <Button size="lg" className="flex-1" onClick={handleContinue}>
            Weiter zur Verifizierung
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
