"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function MessageSentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Nachricht gesendet!</h1>
          <p className="text-muted-foreground">Deine Nachricht wurde erfolgreich versendet.</p>
        </div>

        <Link href="/" className="block">
          <Button className="w-full h-12">Zurück zur Startseite</Button>
        </Link>
      </div>
    </div>
  )
}
