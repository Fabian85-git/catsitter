import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="space-y-6">
        <div className="px-4 py-6 max-w-screen-xl mx-auto">
          {/* Next Appointment Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-balance">Nächster Termin</h2>
            <Card className="p-2 border-l-8 border-l-[#5682D3]">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-semibold text-lg">28. September 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">9:00 - 10:00 Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img src="/smiling-brown-haired-woman.png" alt="Anna" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Sitting bei <span className="font-semibold text-foreground">Anna</span>
                  </p>
                  <p className="text-sm">Blanca & Bionda 🐱 🐱</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Link href="/termine/1">
                  <Button variant="ghost" size="sm" className="gap-1 h-8">
                    Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Link
              href="/termine"
              className="flex items-center gap-2 mt-4 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-medium">Alle Termine anzeigen</span>
            </Link>
          </section>
        </div>

        <section>
          <div className="px-4 max-w-screen-xl mx-auto mb-4">
            <h2 className="text-2xl font-bold text-balance">Katzensitter in deiner Umgebung</h2>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43239.82579415253!2d8.517445!3d47.376888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc0e6e41%3A0xf5c698b65f8c52a7!2sZ%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Cat emoji markers overlay */}
            <div
              className="absolute top-[20%] left-[15%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute top-[35%] right-[25%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute bottom-[30%] left-[40%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute top-[50%] right-[15%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute bottom-[20%] left-[25%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute top-[45%] left-[55%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
            <div
              className="absolute bottom-[35%] right-[35%] text-3xl cursor-pointer hover:scale-110 transition-transform"
              title="Katzensitter"
            >
              😺
            </div>
          </div>

          <div className="px-4 max-w-screen-xl mx-auto mt-4">
            <Link
              href="/sitter/connect"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-medium">Erweiterte Suche</span>
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
