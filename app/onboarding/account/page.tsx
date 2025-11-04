"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function OnboardingAccount() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    password: "",
    acceptTerms: false,
  })

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.nickname &&
    formData.email &&
    formData.password &&
    formData.acceptTerms

  const handleContinue = () => {
    if (isFormValid) {
      localStorage.setItem("onboarding_account", JSON.stringify(formData))
      router.push("/onboarding/profile")
    }
  }

  return (
    <OnboardingLayout currentStep={3} useCard={false}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Konto erstellen</h1>
          <p className="text-muted-foreground">Bitte gib deine Basisdaten ein</p>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Vorname <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Max"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Bleibt anonym</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Nachname <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Muster"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Bleibt anonym</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">
              Nickname <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nickname"
              placeholder="CatLover123"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Wird in der App angezeigt</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              E-Mail-Adresse <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="max@beispiel.ch"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Passwort <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              Ich stimme den{" "}
              <a href="#" className="text-primary hover:underline">
                AGB
              </a>{" "}
              und{" "}
              <a href="#" className="text-primary hover:underline">
                Datenschutzbestimmungen
              </a>{" "}
              zu <span className="text-destructive">*</span>
            </Label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Zurück
          </Button>
          <Button size="lg" className="flex-1" disabled={!isFormValid} onClick={handleContinue}>
            Konto erstellen
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
