"use client"

import type React from "react"

import { ArrowLeft, Pencil, Check, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function PersonalDataPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    profileImage: "",
    role: "",
    service_type: "",
    price_one_visit: "",
    price_two_visits: "",
    offers_feeding: false,
    offers_overnight: false,
    offers_medical: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

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

      if (profileData) {
        setProfile(profileData)
        setFormData({
          nickname: profileData.nickname || "",
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
          address: profileData.address || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          profileImage: profileData.avatar || "",
          role: profileData.role || "",
          service_type: profileData.service_type || "",
          price_one_visit: profileData.price_one_visit || "",
          price_two_visits: profileData.price_two_visits || "",
          offers_feeding: profileData.offers_feeding || false,
          offers_overnight: profileData.offers_overnight || false,
          offers_medical: profileData.offers_medical || false,
        })
      }
    } catch (error) {
      console.error("Error in loadProfile:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        nickname: formData.nickname,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.profileImage,
        role: formData.role,
        service_type: formData.service_type,
        price_one_visit: formData.price_one_visit,
        price_two_visits: formData.price_two_visits,
        offers_feeding: formData.offers_feeding,
        offers_overnight: formData.offers_overnight,
        offers_medical: formData.offers_medical,
      }

      localStorage.setItem("userProfile", JSON.stringify(updatedProfile))

      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      currentUser.profile = updatedProfile
      localStorage.setItem("currentUser", JSON.stringify(currentUser))

      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error("Error in handleSave:", error)
      alert("Fehler beim Speichern des Profils")
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        nickname: profile.nickname || "",
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        address: profile.address || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profileImage: profile.avatar || "",
        role: profile.role || "",
        service_type: profile.service_type || "",
        price_one_visit: profile.price_one_visit || "",
        price_two_visits: profile.price_two_visits || "",
        offers_feeding: profile.offers_feeding || false,
        offers_overnight: profile.offers_overnight || false,
        offers_medical: profile.offers_medical || false,
      })
    }
    setIsEditing(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Profil wird geladen...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Kein Profil gefunden</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with back button and edit button */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Persönliche Daten</h1>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center py-6">
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={formData.profileImage || profile.avatar} alt="Profile" />
              <AvatarFallback className="text-3xl">
                {formData.firstName?.[0] || profile.first_name?.[0]}
                {formData.lastName?.[0] || profile.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-5 h-5" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Nickname */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">Nickname</label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.nickname}</p>
            )}
          </div>

          {/* Vorname */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">Vorname</label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.first_name}</p>
            )}
          </div>

          {/* Nachname */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">Nachname</label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.last_name}</p>
            )}
          </div>

          {/* Adresse */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">Adresse</label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.address}</p>
            )}
          </div>

          {/* E-Mail */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">E-Mail</label>
            {isEditing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.email}</p>
            )}
          </div>

          {/* Telefon */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">Telefon</label>
            {isEditing ? (
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full"
              />
            ) : (
              <p className="text-lg font-medium">{profile.phone || "Nicht angegeben"}</p>
            )}
          </div>
        </div>

        {/* Action Buttons (only visible in edit mode) */}
        {isEditing && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Abbrechen
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Speichern
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
