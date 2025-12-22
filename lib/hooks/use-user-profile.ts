"use client"

import { useState, useEffect } from "react"
import { userProfileStore } from "../data-store"
import type { UserProfile } from "../types"

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = () => {
      const data = userProfileStore.get()
      setProfile(data)
      setLoading(false)
    }

    loadProfile()

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "miauzly_user_profile") {
        loadProfile()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = userProfileStore.update(updates)
    if (updated) {
      setProfile(updated)
    }
  }

  const updateSittingType = (sittingType: "tausch" | "bezahlt") => {
    updateProfile({ sittingType })
  }

  const clearProfile = () => {
    userProfileStore.clear()
    setProfile(null)
  }

  return {
    profile,
    loading,
    updateProfile,
    updateSittingType,
    clearProfile,
    setProfile: (p: UserProfile) => {
      userProfileStore.set(p)
      setProfile(p)
    },
  }
}
