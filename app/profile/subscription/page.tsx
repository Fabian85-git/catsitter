"use client"

import { ArrowLeft, Check, Crown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionPage() {
  const router = useRouter()
  const currentPlan = "premium" // Current active subscription

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "0 CHF",
      period: "kostenlos",
      description: "Perfekt zum Starten",
      features: [
        "Profil erstellen",
        "Nur Bezahlt-Sitten möglich",
        "Basis-Kalender",
        "Bis zu 3 Fotos in Galerie",
        "Standard Support",
      ],
      icon: Star,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
    },
    {
      id: "member",
      name: "Member",
      price: "4.90 CHF",
      period: "pro Monat",
      description: "Für aktive Sitter",
      features: [
        "Alle Free-Features",
        "Tausch und Bezahlt möglich",
        "Erweiterte Kalender-Funktionen",
        "Bis zu 10 Fotos in Galerie",
        "Prioritäts-Support",
        "Bewertungen sichtbar",
      ],
      icon: Star,
      color: "text-[#5682D3]",
      bgColor: "bg-[#5682D3]/10",
    },
    {
      id: "premium",
      name: "Premium",
      price: "9.90 CHF",
      period: "pro Monat",
      description: "Für Profis",
      features: [
        "Alle Member-Features",
        "Verifiziertes Profil-Badge",
        "Priorität in Suchergebnissen",
        "Unbegrenzte Fotos",
        "Keine Kommissionsgebühren",
        "Statistiken & Profilbesucher",
        "Früher Zugang zu neuen Features",
        "Premium Support 24/7",
      ],
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/10",
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Abo verwalten</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Wähle dein perfektes Abo</h2>
          <p className="text-muted-foreground">Upgrade jederzeit möglich, keine Kündigungsfrist</p>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isActive = currentPlan === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative p-6 ${
                  isActive ? "border-2 border-primary shadow-lg" : ""
                } ${plan.popular ? "md:scale-105" : ""}`}
              >
                {/* Active Badge */}
                {isActive && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">Aktuell</Badge>
                )}

                {/* Popular Badge */}
                {plan.popular && !isActive && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5682D3] text-white">Beliebt</Badge>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-full ${plan.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${plan.color}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price.split(" ")[0]}</span>
                    <span className="text-lg font-semibold">{plan.price.split(" ")[1]}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={isActive ? "outline" : plan.popular ? "default" : "outline"}
                  disabled={isActive}
                >
                  {isActive ? "Aktives Abo" : plan.id === "free" ? "Downgrade" : "Upgrade"}
                </Button>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <Card className="mt-8 p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Wichtige Informationen</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Alle Abos können jederzeit gekündigt werden</li>
            <li>• Keine versteckten Kosten oder Gebühren</li>
            <li>• Bei Downgrade bleiben Features bis Monatsende aktiv</li>
            <li>• Upgrade wird sofort aktiviert, anteilige Verrechnung</li>
            <li>• Sichere Zahlung via Kreditkarte oder TWINT</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
