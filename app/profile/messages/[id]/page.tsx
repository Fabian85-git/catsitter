"use client"

import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const [message, setMessage] = useState("")

  // Mock data - in real app, fetch based on params.id
  const chatData: Record<string, any> = {
    sandra: {
      name: "Sandra",
      avatar: "/diverse-woman-portrait.png",
      messages: [
        { id: 1, text: "Hallo! Ich habe deine Anfrage gesehen.", sender: "them", time: "10:30" },
        { id: 2, text: "Hi Sandra! Ja, ich suche einen Sitter für nächste Woche.", sender: "me", time: "10:32" },
        { id: 3, text: "Kein Problem! Welche Tage genau?", sender: "them", time: "10:33" },
        { id: 4, text: "Von Montag bis Mittwoch, jeweils morgens und abends.", sender: "me", time: "10:35" },
        { id: 5, text: "Das passt perfekt! Meine Katzen sind sehr pflegeleicht.", sender: "them", time: "10:40" },
        { id: 6, text: "Super! Was für Futter bekommen sie?", sender: "me", time: "10:42" },
        {
          id: 7,
          text: "Nassfutter morgens und Trockenfutter abends. Ich bereite alles vor.",
          sender: "them",
          time: "10:45",
        },
        { id: 8, text: "Danke für die Info! Bis dann 😊", sender: "them", time: "14:30" },
      ],
    },
    tommy: {
      name: "Tommy",
      avatar: "/thoughtful-man-portrait.png",
      messages: [
        { id: 1, text: "Hey! Wegen dem Termin am Freitag...", sender: "them", time: "Gestern, 16:20" },
        { id: 2, text: "Ja, was ist damit?", sender: "me", time: "Gestern, 16:25" },
        { id: 3, text: "Können wir den Termin verschieben?", sender: "them", time: "Gestern, 16:30" },
      ],
    },
    "anna-kim": {
      name: "Anna & Kim",
      avatar: "/woman-portrait.png",
      messages: [
        { id: 1, text: "Hallo! Danke für deine Nachricht.", sender: "them", time: "Mo, 09:15" },
        { id: 2, text: "Gerne! Wann passt es dir am besten?", sender: "me", time: "Mo, 09:20" },
        { id: 3, text: "Perfekt, ich freue mich!", sender: "them", time: "Mo, 09:25" },
      ],
    },
    charly: {
      name: "Charly",
      avatar: "/man-portrait-glasses.png",
      messages: [
        { id: 1, text: "Hi! Ich habe drei Katzen.", sender: "them", time: "So, 14:00" },
        { id: 2, text: "Kein Problem! Erzähl mir mehr über sie.", sender: "me", time: "So, 14:05" },
        { id: 3, text: "Hast du noch Fragen zu meinen Katzen?", sender: "them", time: "So, 14:10" },
      ],
    },
    esmeralda: {
      name: "Esmeralda",
      avatar: "/woman-portrait-curly-hair.jpg",
      messages: [
        { id: 1, text: "Danke für deine Unterstützung!", sender: "them", time: "Fr, 11:30" },
        { id: 2, text: "Immer gerne! Melde dich, wenn du wieder Hilfe brauchst.", sender: "me", time: "Fr, 11:35" },
        { id: 3, text: "Vielen Dank für deine Hilfe!", sender: "them", time: "Fr, 11:40" },
      ],
    },
  }

  const chat = chatData[params.id as string] || chatData.sandra

  const handleSend = () => {
    if (message.trim()) {
      // In real app, send message to backend
      console.log("[v0] Sending message:", message)
      setMessage("")
    }
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
              <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg font-bold">{chat.name}</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-screen-xl mx-auto w-full">
        {chat.messages.map((msg: any) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] ${msg.sender === "me" ? "order-2" : "order-1"}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-2">{msg.time}</p>
            </div>
          </div>
        ))}
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
