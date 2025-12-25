import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function SitterPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-balance">Ich möchte... </h1>
        <p className="text-sm text-muted-foreground mb-6"> </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/sitter/my-absences">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary overflow-hidden p-0 min-h-[180px] border shadow-none">
              <div className="flex items-stretch h-full min-h-[180px]">
                <div className="flex-1 p-6 flex flex-col justify-center px-4 py-4">
                  <h3 className="text-xl font-semibold mb-2 mt-0 py-0 border-0">Katzensitter finden </h3>
                  <p className="text-sm text-muted-foreground">Gib an, an welchen Daten du abwesend bist </p>
                </div>
                <div className="relative w-40 flex-shrink-0">
                  <Image src="/search-illustration.jpg" alt="Katzen mit Koffer" fill className="object-cover" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/sitter/find-cats">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary overflow-hidden p-0 min-h-[180px] border shadow-none">
              <div className="flex items-stretch h-full min-h-[180px]">
                <div className="flex-1 p-6 flex justify-center flex-col px-4 py-4">
                  <h3 className="text-xl font-semibold mb-2">Katzen sitten </h3>
                  <p className="text-sm text-muted-foreground">
                    Finde Katzen die einen geniale Sitter wie dich benötigen
                  </p>
                </div>
                <div className="relative w-40 flex-shrink-0">
                  <Image src="/sitting-illustration.jpg" alt="Person mit Katze" fill className="object-cover mx-0" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/sitter/connect">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary overflow-hidden p-0 min-h-[180px] shadow-none border">
              <div className="flex items-stretch h-full min-h-[180px]">
                <div className="flex-1 p-6 flex flex-col justify-center py-4 px-4">
                  <h3 className="text-xl font-semibold mb-2">mich einfach Verbinden</h3>
                  <p className="text-sm text-muted-foreground">
                    Lerne weitere Katzenhalter:innen kennen     
                  </p>
                </div>
                <div className="relative w-40 flex-shrink-0">
                  <Image src="/connect-illustration.jpg" alt="Personen verbinden sich" fill className="object-cover" />
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
