"use client"

import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BottomNav } from "@/components/bottom-nav"

const roles = [
  { id: "sitter", label: "Ich bin nur Katzensitter:in" },
  { id: "owner", label: "Ich bin nur Katzenhalter:in" },
  { id: "both", label: "Ich bin Katzensitter und Halter:in" },
]

export default function RollePage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>("")

  useEffect(() => {
    const stored = localStorage.getItem("miauzly_user_role")
    if (stored) {
      const data = JSON.parse(stored)
      setSelectedRole(data.id)
    }
  }, [])

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    const roleLabel = roles.find((r) => r.id === roleId)?.label || ""
    localStorage.setItem("miauzly_user_role", JSON.stringify({ id: roleId, role: roleLabel }))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Rolle</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <p className="text-muted-foreground mb-6">
          Wähle deine Rolle, um die App optimal auf deine Bedürfnisse anzupassen.
        </p>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                selectedRole === role.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <span className="font-medium">{role.label}</span>
              {selectedRole === role.id && <Check className="w-5 h-5 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
