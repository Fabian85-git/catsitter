"use client"

import type React from "react"

import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export default function AIBeraterPage() {
  const router = useRouter()
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/forum/ai-berater" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      {/* Header with back button */}
      <div className="sticky top-16 z-10 bg-background border-b">
        <div className="px-4 py-3 max-w-screen-xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Mia</h1>
              <p className="text-xs text-muted-foreground">AI Katzen-Expertin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-screen-xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Hallo, ich bin Mia!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Ich bin deine persönliche Katzen-Expertin und helfe dir gerne bei allen Fragen rund um deine Miautzer.
            </p>
            <div className="space-y-2 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground text-left font-medium">Beispielfragen:</p>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-transparent"
                onClick={() => {
                  setInput("Wie oft sollte ich meine Katze füttern?")
                }}
              >
                Wie oft sollte ich meine Katze füttern?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-transparent"
                onClick={() => {
                  setInput("Warum miaut meine Katze nachts?")
                }}
              >
                Warum miaut meine Katze nachts?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-transparent"
                onClick={() => {
                  setInput("Welches Spielzeug ist gut für Katzen?")
                }}
              >
                Welches Spielzeug ist gut für Katzen?
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <p key={index} className="text-sm whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))}

          {status === "streaming" && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input form */}
      <div className="sticky bottom-0 bg-background border-t">
        <form onSubmit={handleSubmit} className="px-4 py-4 max-w-screen-xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stelle Mia eine Frage..."
              className="flex-1"
              disabled={status !== "ready"}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || status !== "ready"}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
