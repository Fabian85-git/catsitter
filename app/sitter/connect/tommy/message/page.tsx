"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { chatsStore, messagesStore } from "@/lib/data-store"
import { getSitterByName } from "@/lib/sitter-data"

export default function MessageTommyPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      const sitter = getSitterByName("Tommy")
      if (sitter) {
        chatsStore.createOrUpdate({
          id: sitter.id,
          userId: sitter.id,
          userName: sitter.name,
          userAvatar: sitter.avatar,
          lastMessage: message.trim(),
        })

        messagesStore.add(sitter.id, {
          senderId: "default-user",
          receiverId: sitter.id,
          content: message.trim(),
          timestamp: new Date().toISOString(),
          read: false,
        })
      }
    }

    router.push("/sitter/connect/tommy/message/sent")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 bg-background border-b px-4 py-4">
        <Link href="/sitter/connect/tommy">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold mt-2">Nachricht an Tommy</h1>
      </div>

      <main className="flex-1 px-4 py-6">
        <Textarea
          placeholder="Schreibe deine Nachricht hier..."
          className="min-h-[300px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </main>

      <div className="sticky bottom-0 bg-background border-t px-4 py-4">
        <Button className="w-full" size="lg" onClick={handleSend}>
          Senden
        </Button>
      </div>
    </div>
  )
}
