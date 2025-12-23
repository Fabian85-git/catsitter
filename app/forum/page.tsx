"use client"

import type React from "react"
import { useRouter } from "next/navigation" // Added useRouter for navigation

import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Flame, Sparkles, Send, ArrowLeft, X } from "lucide-react"
import { useState } from "react"

export default function ForumPage() {
  const router = useRouter() // Added useRouter for navigation
  const [activeTab, setActiveTab] = useState<"posts" | "ai">("posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const topics = ["Ernährung", "Gesundheit", "Verhalten", "Spielzeug", "Rassen", "Pflege", "Erziehung"]

  const allPosts = [
    {
      id: 1,
      title: "Meine Katze frisst nur noch Trockenfutter - ist das ok?",
      preview:
        "Seit ein paar Wochen verweigert meine Katze komplett das Nassfutter. Sie frisst nur noch Trockenfutter. Sollte ich mir Sorgen machen?",
      tags: ["Ernährung", "Gesundheit"],
      author: "Lisa M.",
      replies: 12,
    },
    {
      id: 2,
      title: "Welches Spielzeug mögen eure Katzen am liebsten?",
      preview: "Ich suche nach Empfehlungen für interaktives Spielzeug. Was begeistert eure Miautzer am meisten?",
      tags: ["Spielzeug"],
      author: "Tom K.",
      replies: 8,
    },
    {
      id: 3,
      title: "Tipps für die erste Nacht mit Kitten",
      preview:
        "Morgen hole ich mein erstes Kitten ab. Was sollte ich für die erste Nacht vorbereiten? Habt ihr Tipps damit es nicht zu stressig wird?",
      tags: ["Erziehung", "Verhalten"],
      author: "Sophie W.",
      replies: 15,
    },
    {
      id: 4,
      title: "Katze miaut nachts ständig - was kann ich tun?",
      preview:
        "Meine 3-jährige Katze miaut seit einer Woche jede Nacht laut. Tagsüber ist alles normal. Kennt jemand das Problem?",
      tags: ["Verhalten", "Gesundheit"],
      author: "Max B.",
      replies: 20,
    },
    {
      id: 5,
      title: "Welche Katzenbürste ist am besten für langes Fell?",
      preview: "Meine Maine Coon verliert viel Fell. Welche Bürste empfehlt ihr für langhaarige Katzen?",
      tags: ["Pflege", "Rassen"],
      author: "Anna L.",
      replies: 6,
    },
    {
      id: 6,
      title: "Nassfutter vs Trockenfutter - was ist gesünder?",
      preview: "Ich bin unsicher, welche Fütterungsmethode besser ist. Was füttert ihr euren Katzen?",
      tags: ["Ernährung", "Gesundheit"],
      author: "Peter R.",
      replies: 18,
    },
  ]

  const filteredPosts = allPosts.filter((post) => {
    if (selectedTopic) {
      return post.tags.includes(selectedTopic)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.preview.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setSelectedTopic(null)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setSelectedTopic(null)
  }

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic)
    setSearchQuery("")
    setIsSearching(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <main className="px-4 py-6 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Katzenforum</h1>

        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "posts"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Forum Posts
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "ai"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Berater
          </button>
        </div>

        {activeTab === "posts" ? (
          <>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <div className="flex items-center gap-2">
                {(isSearching || selectedTopic) && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Suche Katzenthema"
                    className="pl-10 pr-10 h-12 rounded-full"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {(isSearching || selectedTopic) && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {selectedTopic
                    ? `Beiträge zum Thema "${selectedTopic}" (${filteredPosts.length})`
                    : `${filteredPosts.length} Suchergebnisse für "${searchQuery}"`}
                </p>
              </div>
            )}

            {/* Topics - hide when searching */}
            {!isSearching && !selectedTopic && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Themen</h2>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => handleTopicClick(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </section>
            )}

            {/* Posts */}
            <section>
              {!isSearching && !selectedTopic && (
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Trend <Flame className="w-5 h-5 text-orange-500" />
                </h2>
              )}
              <div className="space-y-3">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post.id} onClick={() => router.push(`/forum/${post.id}`)} className="cursor-pointer">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.preview}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {post.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation() // Prevent navigation when clicking tag
                                    handleTopicClick(tag)
                                  }}
                                  className="text-xs bg-secondary px-2 py-1 rounded-full hover:bg-secondary/80 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {post.author} · {post.replies} Antworten
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">Keine Beiträge gefunden.</p>
                  </Card>
                )}
              </div>
            </section>
          </>
        ) : (
          <div onClick={() => router.push("/forum/ai-berater")} className="cursor-pointer">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Mia, deine AI Katzen-Expertin</h2>
              <p className="text-muted-foreground mb-4">
                Stelle Mia Fragen zu Katzenpflege, Gesundheit, Verhalten und mehr. Verfügbar 24/7 für dich und deine
                Miautzer.
              </p>
              <Button className="mt-4">
                Chat starten
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
