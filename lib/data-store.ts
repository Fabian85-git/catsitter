import type { UserProfile, Absence, Chat, Message, GalleryPhoto } from "./types"

// Storage keys
const STORAGE_KEYS = {
  USER_PROFILE: "miauzly_user_profile",
  ABSENCES: "miauzly_absences",
  CHATS: "miauzly_chats",
  MESSAGES: "miauzly_messages",
  GALLERY: "miauzly_gallery",
  ONBOARDING_COMPLETE: "miauzly_onboarding_complete",
} as const

// User Profile Operations
export const userProfileStore = {
  get: (): UserProfile | null => {
    if (typeof window === "undefined") return null
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (!data) {
      const defaultProfile: UserProfile = {
        id: "default-user",
        nickname: "fabifabi",
        firstName: "Fabian",
        lastName: "Scheiwiller",
        email: "fabian.scheiwiller@example.com",
        phone: "+41 79 123 45 67",
        address: "Musterstrasse 123, 8000 Zürich",
        role: "both",
        avatar: "/male-profile-portrait.jpg",
        verified: false,
        membershipTier: "premium",
        createdAt: new Date().toISOString(),
      }
      userProfileStore.set(defaultProfile)
      return defaultProfile
    }
    return JSON.parse(data)
  },

  set: (profile: UserProfile): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
  },

  update: (updates: Partial<UserProfile>): UserProfile | null => {
    const current = userProfileStore.get()
    if (!current) return null
    const updated = { ...current, ...updates }
    userProfileStore.set(updated)
    return updated
  },

  clear: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
  },

  resetToDefaults: (): UserProfile => {
    if (typeof window === "undefined") {
      return {
        id: "default-user",
        nickname: "fabifabi",
        firstName: "Fabian",
        lastName: "Scheiwiller",
        email: "fabian.scheiwiller@example.com",
        phone: "+41 79 123 45 67",
        address: "Musterstrasse 123, 8000 Zürich",
        role: "both",
        avatar: "/male-profile-portrait.jpg",
        verified: false,
        membershipTier: "premium",
        createdAt: new Date().toISOString(),
      }
    }
    const defaultProfile: UserProfile = {
      id: "default-user",
      nickname: "fabifabi",
      firstName: "Fabian",
      lastName: "Scheiwiller",
      email: "fabian.scheiwiller@example.com",
      phone: "+41 79 123 45 67",
      address: "Musterstrasse 123, 8000 Zürich",
      role: "both",
      avatar: "/male-profile-portrait.jpg",
      verified: false,
      membershipTier: "premium",
      createdAt: new Date().toISOString(),
    }
    userProfileStore.set(defaultProfile)
    return defaultProfile
  },
}

// Absences Operations
export const absencesStore = {
  getAll: (): Absence[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.ABSENCES)
    if (!data) {
      const sampleAbsences: Absence[] = [
        {
          id: "sample-1",
          title: "Sommerferien Italien",
          dates: "15.07.25 - 29.07.25",
          time: "09:00 - 09:30 Uhr, 18:00 - 18:30 Uhr",
          frequency: "2x täglich - morgen / abends",
          notes:
            "Wir fahren für zwei Wochen nach Italien. Unsere Katze Luna braucht täglich Futter und frisches Wasser. Sie ist sehr verschmust und liebt es, am Fenster zu sitzen.",
          type: "Tausch",
          status: "assigned",
          sitterName: "Sandra M.",
          sitterLocation: "Zürich",
          sitterDistance: "1.2 km",
          sitterRating: 4.9,
          sitterReviews: 127,
          createdAt: new Date("2025-01-15").toISOString(),
        },
      ]
      localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(sampleAbsences))
      return sampleAbsences
    }
    return JSON.parse(data)
  },

  getById: (id: string): Absence | null => {
    const absences = absencesStore.getAll()
    return absences.find((a) => a.id === id) || null
  },

  add: (absence: Omit<Absence, "id" | "createdAt">): Absence => {
    const newAbsence: Absence = {
      ...absence,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    const absences = absencesStore.getAll()
    absences.push(newAbsence)
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(absences))
    return newAbsence
  },

  update: (id: string, updates: Partial<Absence>): Absence | null => {
    const absences = absencesStore.getAll()
    const index = absences.findIndex((a) => a.id === id)
    if (index === -1) return null

    absences[index] = { ...absences[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(absences))
    return absences[index]
  },

  delete: (id: string): boolean => {
    const absences = absencesStore.getAll()
    const filtered = absences.filter((a) => a.id !== id)
    if (filtered.length === absences.length) return false
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(filtered))
    return true
  },
}

// Chats Operations
export const chatsStore = {
  getAll: (): Chat[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.CHATS)
    if (!data) {
      const defaultChats: Chat[] = [
        {
          id: "sandra",
          userId: "sandra",
          userName: "Sandra",
          userAvatar: "/diverse-woman-portrait.png",
          lastMessage: "Danke für die Info! Bis dann 😊",
          timestamp: "Heute, 14:30",
          unread: false,
        },
        {
          id: "tommy",
          userId: "tommy",
          userName: "Tommy",
          userAvatar: "/sitter-tommy-portrait.jpg",
          lastMessage: "Können wir den Termin verschieben?",
          timestamp: "Gestern",
          unread: true,
        },
        {
          id: "anna-kim",
          userId: "anna-kim",
          userName: "Anna & Kim",
          userAvatar: "/sitter-anna-kim-portrait.jpg",
          lastMessage: "Perfekt, ich freue mich!",
          timestamp: "Mo",
          unread: false,
        },
        {
          id: "charly",
          userId: "charly",
          userName: "Charly",
          userAvatar: "/sitter-charly-portrait.jpg",
          lastMessage: "Hast du noch Fragen zu meinen Katzen?",
          timestamp: "So",
          unread: false,
        },
      ]
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(defaultChats))
      return defaultChats
    }
    return JSON.parse(data)
  },

  getById: (id: string): Chat | null => {
    const chats = chatsStore.getAll()
    return chats.find((c) => c.id === id) || null
  },

  createOrUpdate: (chat: Omit<Chat, "timestamp"> & { timestamp?: string }): Chat => {
    const chats = chatsStore.getAll()
    const existingIndex = chats.findIndex((c) => c.id === chat.id)

    const timestamp =
      chat.timestamp ||
      new Date().toLocaleString("de-CH", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })

    const updatedChat: Chat = {
      ...chat,
      timestamp,
      unread: true,
    }

    if (existingIndex >= 0) {
      // Update existing chat
      chats[existingIndex] = updatedChat
    } else {
      // Add new chat at the beginning
      chats.unshift(updatedChat)
    }

    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats))
    return updatedChat
  },

  markAsRead: (id: string): void => {
    const chats = chatsStore.getAll()
    const chat = chats.find((c) => c.id === id)
    if (chat) {
      chat.unread = false
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats))
    }
  },
}

// Messages Operations
export const messagesStore = {
  getByChat: (chatId: string): Message[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(`${STORAGE_KEYS.MESSAGES}_${chatId}`)
    return data ? JSON.parse(data) : []
  },

  add: (chatId: string, message: Omit<Message, "id">): Message => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
    }
    const messages = messagesStore.getByChat(chatId)
    messages.push(newMessage)
    localStorage.setItem(`${STORAGE_KEYS.MESSAGES}_${chatId}`, JSON.stringify(messages))
    return newMessage
  },
}

// Gallery Operations
export const galleryStore = {
  getAll: (): GalleryPhoto[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.GALLERY)
    if (!data) {
      // Initialize with default photos
      const defaultPhotos: GalleryPhoto[] = [
        {
          id: "1",
          url: "/happy-orange-tabby-cat-portrait.jpg",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "2",
          url: "/woman-with-cat-selfie.jpg",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "3",
          url: "/grey-cat-playing-with-toy.jpg",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "4",
          url: "/cute-kitten-sleeping.jpg",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "5",
          url: "/cat-sitting-by-window.jpg",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "6",
          url: "/person-holding-cat.jpg",
          uploadedAt: new Date().toISOString(),
        },
      ]
      galleryStore.setAll(defaultPhotos)
      return defaultPhotos
    }
    return JSON.parse(data)
  },

  setAll: (photos: GalleryPhoto[]): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(photos))
  },

  add: (photo: Omit<GalleryPhoto, "id" | "uploadedAt">): GalleryPhoto => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
    }
    const photos = galleryStore.getAll()
    photos.push(newPhoto)
    galleryStore.setAll(photos)
    return newPhoto
  },

  delete: (id: string): boolean => {
    const photos = galleryStore.getAll()
    const filtered = photos.filter((p) => p.id !== id)
    if (filtered.length === photos.length) return false
    galleryStore.setAll(filtered)
    return true
  },
}

// Onboarding Operations
export const onboardingStore = {
  isComplete: (): boolean => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === "true"
  },

  setComplete: (complete: boolean): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, complete.toString())
  },
}

// Clear all data (for logout)
export const clearAllData = (): void => {
  if (typeof window === "undefined") return
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
  })
  // Also clear any dynamic message keys
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("miauzly_messages_")) {
      localStorage.removeItem(key)
    }
  })
}
