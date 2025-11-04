"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MessageSandraPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    router.push("/sitter/connect/sandra/message/sent")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 bg-background border-b px-4 py-4 flex items-center gap-4">
        <Link href="/sitter/connect/sandra">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Nachricht an Sandra</h1>
      </header>

      <main className="flex-1 px-4 py-6 max-w-screen-xl mx-auto w-full">
        <Textarea
          placeholder="Schreibe deine Nachricht..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[300px] resize-none text-base"
        />
      </main>

      <div className="sticky bottom-0 bg-background border-t px-4 py-4">
        <Button onClick={handleSend} className="w-full text-lg" size="lg">
          Senden
        </Button>
      </div>
    </div>
  )
}
