"use client"

import { useEffect, useRef, useState } from "react"
import type { SitterProfile } from "@/lib/types"

interface MapViewProps {
  markers: Array<{ sitter: SitterProfile; lat: number; lng: number }>
  onMarkerClick: (sitter: SitterProfile) => void
}

export function MapView({ markers, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || leafletMapRef.current) return

    // @ts-ignore - Leaflet is loaded dynamically
    const L = window.L

    // Initialize map centered on Zürich
    const map = L.map(mapRef.current, {
      center: [47.376888, 8.541694],
      zoom: 13,
      zoomControl: true,
    })

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map)

    // Create custom cat emoji icon
    const catIcon = L.divIcon({
      className: "custom-cat-marker",
      html: '<div style="font-size: 32px; cursor: pointer; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">😺</div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })

    // Add markers
    markers.forEach(({ sitter, lat, lng }) => {
      const marker = L.marker([lat, lng], { icon: catIcon })
        .addTo(map)
        .on("click", () => onMarkerClick(sitter))
    })

    leafletMapRef.current = map

    return () => {
      map.remove()
      leafletMapRef.current = null
    }
  }, [isLoaded, markers, onMarkerClick])

  return (
    <div ref={mapRef} className="h-full w-[112%] relative z-0" style={{ minHeight: "400px" }}>
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Karte wird geladen...</p>
        </div>
      )}
    </div>
  )
}
