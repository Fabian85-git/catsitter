"use client"

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { ArrowLeft, MessageCircle, ThumbsUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ForumPostDetail() {
  const params = useParams()
  const [replyText, setReplyText] = useState("")

  const posts: Record<string, any> = {
    "1": {
      id: 1,
      title: "Meine Katze frisst nur noch Trockenfutter - ist das ok?",
      content:
        "Seit ein paar Wochen verweigert meine Katze komplett das Nassfutter. Sie frisst nur noch Trockenfutter. Ich habe verschiedene Marken ausprobiert, aber sie interessiert sich einfach nicht dafür. Sie ist 5 Jahre alt und war bisher immer gesund. Sollte ich mir Sorgen machen oder ist das normal?",
      tags: ["Ernährung", "Gesundheit"],
      author: "Lisa M.",
      date: "Vor 2 Tagen",
      likes: 15,
      replies: [
        {
          id: 1,
          author: "Dr. Miau",
          date: "Vor 1 Tag",
          content:
            "Das ist nicht ungewöhnlich! Manche Katzen entwickeln Vorlieben. Wichtig ist, dass sie genug trinkt, da Trockenfutter weniger Feuchtigkeit enthält. Stelle sicher, dass immer frisches Wasser verfügbar ist.",
          likes: 8,
        },
        {
          id: 2,
          author: "Tom K.",
          date: "Vor 1 Tag",
          content:
            "Meine Katze hatte das gleiche Problem. Ich habe das Nassfutter mit etwas Trockenfutter gemischt und dann langsam den Anteil erhöht. Hat bei uns funktioniert!",
          likes: 5,
        },
      ],
    },
    "2": {
      id: 2,
      title: "Welches Spielzeug mögen eure Katzen am liebsten?",
      content:
        "Ich suche nach Empfehlungen für interaktives Spielzeug. Was begeistert eure Miautzer am meisten? Meine Katze wird schnell gelangweilt von normalen Mäusen und Bällen.",
      tags: ["Spielzeug"],
      author: "Tom K.",
      date: "Vor 3 Tagen",
      likes: 12,
      replies: [
        {
          id: 1,
          author: "Anna L.",
          date: "Vor 2 Tagen",
          content:
            "Federangeln sind der Hit bei uns! Besonders die mit längeren Federn. Meine Katze spielt stundenlang damit.",
          likes: 6,
        },
      ],
    },
    "3": {
      id: 3,
      title: "Tipps für die erste Nacht mit Kitten",
      content:
        "Morgen hole ich mein erstes Kitten ab. Was sollte ich für die erste Nacht vorbereiten? Habt ihr Tipps damit es nicht zu stressig wird? Ich habe bereits Katzenklo, Futter und ein Körbchen besorgt.",
      tags: ["Erziehung", "Verhalten"],
      author: "Sophie W.",
      date: "Vor 1 Tag",
      likes: 20,
      replies: [
        {
          id: 1,
          author: "Max B.",
          date: "Vor 1 Tag",
          content:
            "Bereite einen ruhigen, sicheren Raum vor. Das Kitten braucht Zeit, sich einzugewöhnen. Nicht zu viele neue Eindrücke auf einmal! Eine Wärmflasche im Körbchen hilft auch.",
          likes: 10,
        },
        {
          id: 2,
          author: "Lisa M.",
          date: "Vor 1 Tag",
          content:
            "Lass das Kitten in seinem eigenen Tempo den Raum erkunden. Zeig ihm wo Futter und Klo sind. Erwarte nicht, dass es sofort kuschelt - das kommt mit der Zeit!",
          likes: 8,
        },
      ],
    },
    "4": {
      id: 4,
      title: "Katze miaut nachts ständig - was kann ich tun?",
      content:
        "Meine 3-jährige Katze miaut seit einer Woche jede Nacht laut. Tagsüber ist alles normal. Sie hat genug Futter und Wasser. Kennt jemand das Problem? Ich bin langsam wirklich müde.",
      tags: ["Verhalten", "Gesundheit"],
      author: "Max B.",
      date: "Vor 4 Tagen",
      likes: 18,
      replies: [
        {
          id: 1,
          author: "Dr. Miau",
          date: "Vor 3 Tagen",
          content:
            "Das kann verschiedene Ursachen haben. Manchmal ist es Langeweile oder ein veränderter Schlafrhythmus. Spiele vor dem Schlafengehen intensiv mit der Katze, damit sie müde ist. Falls es nicht besser wird, lass sie vom Tierarzt checken.",
          likes: 12,
        },
      ],
    },
    "5": {
      id: 5,
      title: "Welche Katzenbürste ist am besten für langes Fell?",
      content:
        "Meine Maine Coon verliert viel Fell. Welche Bürste empfehlt ihr für langhaarige Katzen? Ich habe schon ein paar ausprobiert, aber sie ziehen immer am Fell.",
      tags: ["Pflege", "Rassen"],
      author: "Anna L.",
      date: "Vor 5 Tagen",
      likes: 10,
      replies: [],
    },
    "6": {
      id: 6,
      title: "Nassfutter vs Trockenfutter - was ist gesünder?",
      content:
        "Ich bin unsicher, welche Fütterungsmethode besser ist. Was füttert ihr euren Katzen? Ich habe gehört, dass Nassfutter besser für die Nieren ist, aber meine Katze mag lieber Trockenfutter.",
      tags: ["Ernährung", "Gesundheit"],
      author: "Peter R.",
      date: "Vor 1 Woche",
      likes: 25,
      replies: [
        {
          id: 1,
          author: "Dr. Miau",
          date: "Vor 6 Tagen",
          content:
            "Beides hat Vor- und Nachteile. Nassfutter enthält mehr Feuchtigkeit, was gut für die Nieren ist. Trockenfutter ist praktischer und kann die Zähne reinigen. Eine Kombination ist oft ideal!",
          likes: 15,
        },
      ],
    },
  }

  const post = posts[params.id as string]

  if (!post) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <AppHeader />
        <main className="px-4 py-6 max-w-screen-xl mx-auto">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Beitrag nicht gefunden.</p>
            <Link href="/forum">
              <Button className="mt-4">Zurück zum Forum</Button>
            </Link>
          </Card>
        </main>
        <BottomNav />
      </div>
    )
  }

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // In a real app, this would save to database
      setReplyText("")
      alert("Deine Antwort wurde gepostet!")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <Link href="/forum">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Forum
          </Button>
        </Link>

        {/* Original Post */}
        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">{post.author[0]}</span>
            </Avatar>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </Button>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.replies.length} Antworten
            </span>
            <div className="flex gap-2 ml-auto">
              {post.tags.map((tag: string, idx: number) => (
                <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Replies */}
        {post.replies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Antworten ({post.replies.length})</h2>
            <div className="space-y-4">
              {post.replies.map((reply: any) => (
                <Card key={reply.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8 bg-secondary flex items-center justify-center">
                      <span className="text-sm font-medium">{reply.author[0]}</span>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{reply.author}</p>
                      <p className="text-xs text-muted-foreground">{reply.date}</p>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed mb-3">{reply.content}</p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    {reply.likes}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Reply Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Deine Antwort</h3>
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Teile deine Gedanken oder Erfahrungen..."
            className="mb-4 min-h-[120px]"
          />
          <Button onClick={handleSubmitReply} disabled={!replyText.trim()}>
            Antwort posten
          </Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
