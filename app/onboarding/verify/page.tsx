"use client"

import { useState } from "react"
import { OnboardingLayout } from "@/components/onboarding-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Upload, FileText, Camera, Shield } from "lucide-react"

export default function OnboardingVerify() {
  const router = useRouter()
  const [uploads, setUploads] = useState({
    id: null as File | null,
    residence: null as File | null,
    selfie: null as File | null,
  })

  const handleFileUpload = (type: keyof typeof uploads, file: File | null) => {
    setUploads({ ...uploads, [type]: file })
  }

  const handleContinue = () => {
    const role = localStorage.getItem("onboarding_role")
    localStorage.setItem("onboarding_verify", JSON.stringify(uploads))

    if (role === "sitter") {
      router.push("/onboarding/sitter")
    } else if (role === "owner") {
      router.push("/onboarding/owner")
    } else {
      router.push("/onboarding/both")
    }
  }

  const handleSkip = () => {
    const role = localStorage.getItem("onboarding_role")

    if (role === "sitter") {
      router.push("/onboarding/sitter")
    } else if (role === "owner") {
      router.push("/onboarding/owner")
    } else {
      router.push("/onboarding/both")
    }
  }

  const UploadCard = ({
    icon: Icon,
    title,
    description,
    type,
  }: {
    icon: any
    title: string
    description: string
    type: keyof typeof uploads
  }) => (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div>
            <input
              type="file"
              id={`upload-${type}`}
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
            />
            <Button variant="outline" size="sm" onClick={() => document.getElementById(`upload-${type}`)?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              {uploads[type] ? "Datei ändern" : "Datei hochladen"}
            </Button>
            {uploads[type] && <p className="text-xs text-muted-foreground mt-1">✓ {uploads[type]?.name}</p>}
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <OnboardingLayout currentStep={5}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-[#5682D3]/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#5682D3]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Identitäts- und Wohnsitzprüfung</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Zur Sicherheit aller Miauzly-Nutzer kannst du dich verifizieren. Dies ist optional, wird aber empfohlen.
          </p>
        </div>

        <div className="space-y-4">
          <UploadCard
            icon={FileText}
            title="Personalausweis / Pass"
            description="Lade ein Foto deines Ausweises hoch"
            type="id"
          />

          <UploadCard
            icon={FileText}
            title="Wohnsitzbestätigung"
            description="Z.B. Rechnung oder offizielles Dokument"
            type="residence"
          />

          <UploadCard icon={Camera} title="Selfie-Upload" description="Ein aktuelles Foto von dir" type="selfie" />
        </div>

        <Card className="p-4 bg-muted/50">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#5682D3] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Deine Daten sind sicher</p>
              <p className="text-muted-foreground">
                Alle hochgeladenen Dokumente werden verschlüsselt gespeichert und nur zur Verifikation verwendet.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={handleSkip}>
            Überspringen
          </Button>
          <Button size="lg" className="flex-1" onClick={handleContinue}>
            Verifizierung starten
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
