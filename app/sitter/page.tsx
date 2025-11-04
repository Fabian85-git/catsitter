import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Search, Cat, Hand } from "lucide-react"
import Link from "next/link"

export default function SitterPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-balance">Der perfekte Katzensitter</h1>
        <p className="text-sm text-muted-foreground mb-6">Wonach suchst du?</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/sitter/my-absences">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary h-full">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 rounded-full bg-muted">
                  <Search className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Ich suche Sitter</h3>
                  <p className="text-sm text-muted-foreground">Gib an für welche Daten du Sitter suchst</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/sitter/find-cats">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary h-full">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 rounded-full bg-muted">
                  <Cat className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Ich möchte sitten</h3>
                  <p className="text-sm text-muted-foreground">
                    Finde Katzen die einen geniale Sitter wie dich benötigen
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/sitter/connect">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary h-full">
              <div className="flex flex-col items-start gap-4">
                <div className="p-3 rounded-full bg-muted">
                  <Hand className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Einfach nur Verbinden</h3>
                  <p className="text-sm text-muted-foreground">
                    Suche und finde andere Katzensitter. Wer weiss, vielleicht könnt ihr euch später aushelfen.
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
