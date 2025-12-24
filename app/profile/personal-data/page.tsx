"use client"

import type React from "react"

import { ArrowLeft, Pencil, Check, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useUserProfile } from "@/lib/hooks/use-user-profile"
import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function PersonalDataPage() {
  const router = useRouter()
  const { profile, updateProfile } = useUserProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    profileImage: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (profile) {
      setFormData({
        nickname: profile.nickname || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        address: profile.address || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profileImage: profile.avatar || "",
      })
    }
  }, [profile])

  const handleSave = () => {
    updateProfile({
      ...formData,
      avatar: formData.profileImage,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        nickname: profile.nickname || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        address: profile.address || "",
        email: profile.email || "",
        phone: profile.phone || "",
        profileImage: profile.avatar || "",
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Profil wird geladen...</p>
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
                {profile.firstName?.[0]}
                {profile.lastName?.[0]}
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
              <p className="text-lg font-medium">{profile.firstName}</p>
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
              <p className="text-lg font-medium">{profile.lastName}</p>
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
