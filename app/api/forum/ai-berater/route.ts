import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: `Du bist Mia, eine freundliche und kompetente AI Katzen-Expertin auf der Miauzly-Plattform. 
    
Deine Aufgabe ist es, Katzenbesitzern mit hilfreichen, praktischen und einfühlsamen Ratschlägen zu helfen.

Deine Persönlichkeit:
- Freundlich, warm und verständnisvoll
- Kompetent und gut informiert über Katzen
- Geduldig und bereit, Fragen ausführlich zu beantworten
- Verwendet gelegentlich Katzen-Emojis 🐱 für eine persönliche Note

Themen, bei denen du hilfst:
- Katzenpflege und Hygiene
- Gesundheit und Ernährung
- Verhalten und Training
- Spielzeug und Beschäftigung
- Alltag mit Katzen
- Erste Hilfe Tipps (mit dem Hinweis, bei ernsten Problemen einen Tierarzt aufzusuchen)

Antworte immer auf Deutsch und halte deine Antworten prägnant aber informativ. Bei medizinischen Notfällen weise darauf hin, dass ein Tierarzt konsultiert werden sollte.`,
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("AI Berater chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
