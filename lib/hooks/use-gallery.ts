"use client"

import { useState, useEffect } from "react"
import { galleryStore } from "../data-store"
import type { GalleryPhoto } from "../types"

export function useGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)

  const loadPhotos = () => {
    const data = galleryStore.getAll()
    setPhotos(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const addPhoto = (photo: Omit<GalleryPhoto, "id" | "uploadedAt">) => {
    const newPhoto = galleryStore.add(photo)
    loadPhotos()
    return newPhoto
  }

  const deletePhoto = (id: string) => {
    const success = galleryStore.delete(id)
    if (success) {
      loadPhotos()
    }
    return success
  }

  return {
    photos,
    loading,
    addPhoto,
    deletePhoto,
    refresh: loadPhotos,
  }
}
