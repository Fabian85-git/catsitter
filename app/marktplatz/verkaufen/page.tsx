"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function VerkaufenPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])

  const categories = [
    "Katzenfutter",
    "Spielmäuse",
    "Pflege & Hygiene",
    "Interaktive Spielzeuge",
    "Kratzbäume",
    "Transportboxen",
    "Näpfe & Tränken",
    "Katzenbetten",
    "Sonstiges",
  ]

  const conditions = ["Neu", "Wie neu", "Gut", "Gebraucht"]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages].slice(0, 5)) // Max 5 images
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    router.push("/marktplatz")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 px-4 py-4 max-w-screen-xl mx-auto">
          <Link href="/marktplatz/meine-artikel">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Artikel verkaufen</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photos Section */}
          <Card className="p-4">
            <Label className="text-base font-semibold mb-3 block">Fotos (max. 5)</Label>
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">Foto hinzufügen</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </Card>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titel *</Label>
            <Input id="title" placeholder="z.B. Kratzbaum wie neu" required className="h-12" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategorie *</Label>
            <Select required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Kategorie wählen" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Preis (CHF) *</Label>
            <div className="relative">
              <Input id="price" type="number" placeholder="0.00" required className="h-12 pr-12" step="0.01" min="0" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">CHF</span>
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label htmlFor="condition">Zustand *</Label>
            <Select required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Zustand wählen" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition.toLowerCase()}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung *</Label>
            <Textarea
              id="description"
              placeholder="Beschreibe dein Artikel..."
              required
              className="min-h-32 resize-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Standort *</Label>
            <Input id="location" placeholder="z.B. Zürich, 8001" required className="h-12" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Link href="/marktplatz/meine-artikel" className="flex-1">
              <Button type="button" variant="outline" className="w-full h-12 bg-transparent">
                Abbrechen
              </Button>
            </Link>
            <Button type="submit" className="flex-1 h-12">
              Veröffentlichen
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
