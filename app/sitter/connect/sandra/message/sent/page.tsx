import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function MessageSentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-24 h-24 text-primary" />
        </div>

        <h1 className="text-3xl font-bold">Nachricht gesendet!</h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Deine Nachricht wurde erfolgreich an Sandra gesendet. Sie wird sich bald bei dir melden.
        </p>

        <div className="pt-8">
          <Link href="/">
            <Button className="w-full text-lg" size="lg">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
