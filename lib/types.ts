// Central type definitions for the entire app

export interface UserProfile {
  id: string
  nickname: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  role: "sitter" | "owner" | "both"
  avatar?: string
  verified?: boolean
  membershipTier: "free" | "member" | "premium"
  createdAt: string
}

export interface Absence {
  id: string
  userId: string
  title: string
  dates: string // Changed from fromDate/toDate to dates field for display
  time?: string
  frequency: string // Added frequency field
  notes: string // Added notes field
  type: "Tausch" | "Bezahlt" // Added type field
  status?: "open" | "assigned" // Changed status to open/assigned
  assignedSitter?: {
    id: string
    name: string
    avatar: string
  }
  sitterName?: string // Added sitter name
  sitterLocation?: string // Added sitter location
  sitterDistance?: string // Added sitter distance
  sitterRating?: number // Added sitter rating
  sitterReviews?: number // Added sitter review count
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Chat {
  id: string
  userId: string
  userName: string
  userAvatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export interface SitterProfile {
  id: string
  name: string
  avatar: string
  location: string
  distance: string
  rating: number
  reviewCount: number
  bio: string
  fullBio?: string
  photos: string[]
  cats?: Array<{
    name: string
    image: string
  }>
  paymentType: "tausch" | "bezahlt" | "both"
  verified?: boolean
}

export interface GalleryPhoto {
  id: string
  url: string
  caption?: string
  uploadedAt: string
}
