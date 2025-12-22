"use client"

import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { chatsStore, messagesStore } from "@/lib/data-store"
import type { Chat, Message } from "@/lib/types"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const chatId = params.id as string
    const chatData = chatsStore.getById(chatId)

    if (chatData) {
      setChat(chatData)
      // Mark chat as read when opening
      chatsStore.markAsRead(chatId)
    }

    // Load messages for this chat
    const chatMessages = messagesStore.getByChat(chatId)
    setMessages(chatMessages)
  }, [params.id])

  const handleSend = () => {
    if (message.trim() && chat) {
      const chatId = params.id as string

      // Add message to store
      const newMessage = messagesStore.add(chatId, {
        senderId: "default-user",
        receiverId: chat.userId,
        content: message.trim(),
        timestamp: new Date().toISOString(),
        read: false,
      })

      // Update chat with last message
      chatsStore.createOrUpdate({
        ...chat,
        lastMessage: message.trim(),
      })

      // Update local state
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Chat nicht gefunden</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
              <img
                src={chat.userAvatar || "/placeholder.svg"}
                alt={chat.userName}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg font-bold">{chat.userName}</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-screen-xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Noch keine Nachrichten</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === "default-user"
            const time = new Date(msg.timestamp).toLocaleTimeString("de-CH", {
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${isMe ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isMe ? "bg-blue-500 text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">{time}</p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-white p-4 max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nachricht schreiben..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!message.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
