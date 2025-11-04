"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function MessagePage() {
  const params = useParams()
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    // In a real app, send the message to the backend
    router.push(`/sitter/find-cats/${params.id}/message/sent`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 bg-background z-10 border-b px-4 py-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold mt-4">Nachricht senden</h1>
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
