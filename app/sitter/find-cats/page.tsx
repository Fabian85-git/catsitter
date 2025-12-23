"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, ChevronRight, List, Map, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { findCatsOwners } from "@/lib/find-cats-data"

export default function FindCatsPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="sticky top-0 bg-background z-10 border-b">
        <div className="px-4 py-4">
          <Link href="/sitter">
            <Button variant="ghost" size="icon" className="mb-4">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>

          <h1 className="text-2xl font-bold mb-6 text-balance">Sei der perfekte Sitter für...</h1>

          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" className="gap-2 border rounded-lg">
              Distanz
              <ChevronRight className="w-4 h-4 rotate-90" />
            </Button>

            <Button variant="ghost" size="icon" className="border rounded-lg">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>

            <div className="ml-auto flex border rounded-lg overflow-hidden">
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
            {findCatsOwners.map((request) => (
              <div
                key={request.id}
                className="py-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors -mx-4 px-4"
                onClick={() => router.push(`/sitter/find-cats/${request.id}`)}
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                  <Image src={request.image || "/placeholder.svg"} alt={request.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xl font-semibold">{request.name}</h3>
                    <span className="bg-[#5682D3] text-white px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
                      {request.status}
                    </span>
                  </div>

                  <p className="text-sm text-foreground mb-1">{request.cats}</p>
                  <p className="text-sm text-muted-foreground mb-1">{request.distance}</p>
                  <div className="flex items-center gap-1.5 text-sm text-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Datum: {request.dates}</span>
                  </div>
                </div>

                <ChevronRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[calc(100vh-260px)] -mx-4">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.234567890123!2d8.5417!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMicwLjEiIkU!5e0!3m2!1sde!2sch!4v1234567890123!5m2!1sde!2sch&zoom=16`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Overlay markers for each sitter request */}
            <div className="absolute inset-0 pointer-events-none">
              {findCatsOwners.map((request, index) => (
                <div
                  key={request.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto"
                  style={{
                    left: `${50 + (index - 2.5) * 8}%`,
                    top: `${45 + (index % 2) * 10}%`,
                  }}
                  onClick={() => router.push(`/sitter/find-cats/${request.id}`)}
                >
                  <div className="text-4xl hover:scale-110 transition-transform">🐱</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-background border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <p className="font-semibold text-sm">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.distance}</p>
                    <p className="text-xs">{request.cats}</p>
                    <p className="text-xs text-muted-foreground">{request.dates}</p>
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
