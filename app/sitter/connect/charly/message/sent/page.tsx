import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function MessageSentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-center">Nachricht gesendet!</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Deine Nachricht wurde erfolgreich an Charly gesendet. Du erhältst eine Benachrichtigung, sobald Charly
        antwortet.
      </p>
      <Link href="/" className="w-full max-w-md">
        <Button className="w-full rounded-full h-12" size="lg">
          Zur Startseite
        </Button>
      </Link>
    </div>
  )
}
