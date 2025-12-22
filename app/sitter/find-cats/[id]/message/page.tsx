"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getSitterByName } from "@/lib/sitter-data"
import { getOwnerByName } from "@/lib/find-cats-data"
import { chatsStore, messagesStore } from "@/lib/data-store"

export default function MessagePage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [recipientName, setRecipientName] = useState("")

  useEffect(() => {
    const name = sessionStorage.getItem("messageRecipient") || ""
    setRecipientName(name)
    console.log("[v0] Message page loaded, recipient:", name)
  }, [])

  const handleSend = () => {
    if (!message.trim()) return

    const sitter = getSitterByName(recipientName)
    const owner = !sitter ? getOwnerByName(recipientName) : null

    let chatId: string
    let chatData: any

    if (sitter) {
      chatId = sitter.id
      chatData = {
        id: sitter.id,
        userId: sitter.id,
        userName: sitter.name,
        userAvatar: sitter.avatar,
        lastMessage: message.trim(),
      }
    } else if (owner) {
      chatId = owner.id
      chatData = {
        id: owner.id,
        userId: owner.id,
        userName: owner.name,
        userAvatar: owner.image,
        lastMessage: message.trim(),
      }
    } else {
      chatId = recipientName.toLowerCase().replace(/\s+/g, "-")
      chatData = {
        id: chatId,
        userId: chatId,
        userName: recipientName,
        userAvatar: "/placeholder.svg?height=100&width=100",
        lastMessage: message.trim(),
      }
    }

    chatsStore.createOrUpdate(chatData)
    messagesStore.add(chatId, {
      senderId: "default-user",
      receiverId: chatId,
      content: message.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    })

    router.push(`/sitter/find-cats/${params.id}/message/sent`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 bg-background z-10 border-b px-4 py-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold mt-4">Nachricht senden</h1>
        {recipientName && <p className="text-muted-foreground mt-1">An: {recipientName}</p>}
      </div>

      <main className="flex-1 px-4 py-6">
        <Textarea
          placeholder="Schreibe deine Nachricht..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[200px] resize-none"
        />
      </main>

      <div className="sticky bottom-0 bg-background border-t px-4 py-4">
        <Button onClick={handleSend} disabled={!message.trim()} className="w-full h-12">
          Senden
        </Button>
      </div>
    </div>
  )
}
