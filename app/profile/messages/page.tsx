"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { chatsStore } from "@/lib/data-store"
import type { Chat } from "@/lib/types"

export default function MessagesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Chat[]>([])

  useEffect(() => {
    const loadChats = () => {
      setConversations(chatsStore.getAll())
    }

    loadChats()

    // Reload when page becomes visible
    const handleFocus = () => {
      loadChats()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(chatsStore.getAll())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Nachrichten</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {/* Conversations List */}
        <div className="divide-y">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/profile/messages/${conversation.id}`}
              className="block hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 p-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-muted overflow-hidden">
                    <img
                      src={conversation.userAvatar || "/placeholder.svg"}
                      alt={conversation.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.unread && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3
                      className={`font-semibold truncate ${conversation.unread ? "text-foreground" : "text-foreground"}`}
                    >
                      {conversation.userName}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{conversation.timestamp}</span>
                  </div>
                  <p
                    className={`text-sm truncate ${conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
