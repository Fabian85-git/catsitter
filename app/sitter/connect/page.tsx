"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, List, Map } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

const catOwners = [
  {
    id: "sandra",
    name: "Sandra",
    distance: "60m entfernt",
    street: "Norastrastrasse",
    cats: "Bionda & Blanca",
    image: "/orange-tabby-cat.jpg",
    type: "tausch" as const,
    lat: 47.3769,
    lng: 8.5417,
  },
  {
    id: "tommy",
    name: "Tommy",
    distance: "90m entfernt",
    street: "Norastrastrasse",
    cats: "Jesus",
    image: "/grey-white-cat.jpg",
    type: "bezahlt" as const,
    price: 45,
    lat: 47.3775,
    lng: 8.542,
  },
  {
    id: "anna-kim",
    name: "Anna & Kim",
    distance: "120m entfernt",
    street: "Badenerstrasse",
    cats: "Joe & Zen",
    image: "/smiling-brown-haired-woman.png",
    type: "tausch" as const,
    lat: 47.378,
    lng: 8.541,
  },
  {
    id: "charly",
    name: "Charly",
    distance: "210m entfernt",
    street: "Badenerstrasse",
    cats: "Tom, Speedy & Sylvester",
    image: "/dark-haired-man.png",
    type: "bezahlt" as const,
    price: 50,
    lat: 47.379,
    lng: 8.5425,
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    distance: "230m entfernt",
    street: "Badenerstrasse",
    cats: "Joe & Zen",
    image: "/fluffy-persian-cat.jpg",
    type: "tausch" as const,
    lat: 47.3795,
    lng: 8.543,
  },
]

export default function ConnectPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="px-4 py-4">
          <Button variant="ghost" size="icon" className="mb-4" onClick={() => router.push("/sitter")}>
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">Finde Miautzlovers in deiner Nähe</h1>
              <p className="text-sm text-muted-foreground">
                Verbinde dich mit andern Katzenfreaks. Es muss nicht gleich für einen festen Termin sein.
              </p>
            </div>
            <div className="flex border rounded-lg overflow-hidden ml-4 flex-shrink-0">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("map")}
              >
                <Map className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4">
        {viewMode === "list" ? (
          <div className="divide-y">
            {catOwners.map((owner) => (
              <div
                key={owner.id}
                onClick={() => router.push(`/sitter/connect/${owner.id}`)}
                className="py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer -mx-4 px-4"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={owner.image || "/placeholder.svg"} alt={owner.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{owner.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#5682D3] text-white font-medium flex-shrink-0">
                      {owner.type === "tausch" ? "Tausch" : "Bezahlt"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{owner.distance}</p>
                  <p className="text-sm text-muted-foreground">{owner.street}</p>
                  <p className="text-sm">
                    <span className="mr-1">🐱</span>
                    {owner.cats}
                  </p>
                </div>
                <ChevronLeft className="w-6 h-6 rotate-180 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[calc(100vh-240px)] -mx-4">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.234567890123!2d8.5417!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMjcwLjEiIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch&zoom=16`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Overlay markers for each person */}
            <div className="absolute inset-0 pointer-events-none">
              {catOwners.map((owner, index) => (
                <div
                  key={owner.id}
                  onClick={() => router.push(`/sitter/connect/${owner.id}`)}
                  className="pointer-events-auto cursor-pointer"
                  style={{
                    position: "absolute",
                    left: `${50 + (index - 2) * 8}%`,
                    top: `${45 + (index % 2) * 10}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-4xl hover:scale-110 transition-transform">🐱</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-background border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <p className="font-semibold text-sm">{owner.name}</p>
                    <p className="text-xs text-muted-foreground">{owner.distance}</p>
                    <p className="text-xs">{owner.cats}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
