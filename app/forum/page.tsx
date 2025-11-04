import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Flame } from "lucide-react"

export default function ForumPage() {
  const topics = ["Ernährung", "Gesundheit", "Verhalten", "Spielzeug", "Rassen", "Pflege", "Erziehung"]

  const posts = [
    {
      id: 1,
      title: "Meine Katze frisst nur noch Trockenfutter - ist das ok?",
      preview:
        "Seit ein paar Wochen verweigert meine Katze komplett das Nassfutter. Sie frisst nur noch Trockenfutter. Sollte ich mir Sorgen machen?",
    },
    {
      id: 2,
      title: "Welches Spielzeug mögen eure Katzen am liebsten?",
      preview: "Ich suche nach Empfehlungen für interaktives Spielzeug. Was begeistert eure Miautzer am meisten?",
    },
    {
      id: 3,
      title: "Tipps für die erste Nacht mit Kitten",
      preview:
        "Morgen hole ich mein erstes Kitten ab. Was sollte ich für die erste Nacht vorbereiten? Habt ihr Tipps damit es nicht zu stressig wird?",
    },
    {
      id: 4,
      title: "Katze miaut nachts ständig - was kann ich tun?",
      preview:
        "Meine 3-jährige Katze miaut seit einer Woche jede Nacht laut. Tagsüber ist alles normal. Kennt jemand das Problem?",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Katzenforum</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Suche Katzenthema" className="pl-10 h-12 rounded-full" />
        </div>

        {/* Topics */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Themen</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Button key={index} variant="secondary" className="rounded-full">
                {topic}
              </Button>
            ))}
          </div>
        </section>

        {/* Trending Posts */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Trend <Flame className="w-5 h-5 text-orange-500" />
          </h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.preview}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
