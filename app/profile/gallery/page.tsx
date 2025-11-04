"use client"

import type React from "react"

import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

interface Photo {
  id: string
  url: string
  timestamp: number
}

export default function GalleryPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Photo[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedPhotos = localStorage.getItem("userGallery")
    if (savedPhotos) {
      const parsed = JSON.parse(savedPhotos)
      if (parsed.length > 0) {
        setPhotos(parsed)
        return
      }
    }

    // Initialize with default photos if none exist
    const defaultPhotos: Photo[] = [
      {
        id: "default-1",
        url: "/happy-orange-tabby-cat-portrait.jpg",
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      },
      {
        id: "default-2",
        url: "/woman-with-cat-selfie.jpg",
        timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
      },
      {
        id: "default-3",
        url: "/grey-cat-playing-with-toy.jpg",
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
      },
      {
        id: "default-4",
        url: "/cute-kitten-sleeping.jpg",
        timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
      },
      {
        id: "default-5",
        url: "/cat-sitting-by-window.jpg",
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
      },
      {
        id: "default-6",
        url: "/person-holding-cat.jpg",
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      },
    ]
    setPhotos(defaultPhotos)
    localStorage.setItem("userGallery", JSON.stringify(defaultPhotos))
  }, [])

  // Save photos to localStorage whenever they change
  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem("userGallery", JSON.stringify(photos))
    }
  }, [photos])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          timestamp: Date.now(),
        }
        setPhotos((prev) => [newPhoto, ...prev])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDelete = (id: string) => {
    setPhotos((prev) => {
      const updated = prev.filter((photo) => photo.id !== id)
      localStorage.setItem("userGallery", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Fotogalerie</h1>
          </div>
          <Button variant="default" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Upload className="w-4 h-4" />
            Hochladen
          </Button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Empty state */}
        {photos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Keine Fotos vorhanden</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Lade Fotos von dir und deinen Katzen hoch, damit andere Benutzer dich besser kennenlernen können.
            </p>
            <Button variant="default" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="w-4 h-4" />
              Erstes Foto hochladen
            </Button>
          </div>
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square group">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt="Gallery photo"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                  onClick={() => handleDelete(photo.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Info text */}
        {photos.length > 0 && (
          <p className="text-sm text-muted-foreground text-center mt-8">
            Diese Fotos sind für andere App-Benutzer sichtbar
          </p>
        )}
      </div>
    </div>
  )
}
