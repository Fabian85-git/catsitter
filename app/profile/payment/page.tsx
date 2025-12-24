"use client"

import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentMethod {
  id: string
  type: string
  last4?: string
  expiry?: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const router = useRouter()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardName, setCardName] = useState("")

  useEffect(() => {
    // Load payment methods from localStorage
    const stored = localStorage.getItem("miauzly_payment_methods")
    if (stored) {
      setPaymentMethods(JSON.parse(stored))
    } else {
      // Default Stripe payment method
      const defaultMethod: PaymentMethod = {
        id: "stripe_default",
        type: "Stripe",
        isDefault: true,
      }
      setPaymentMethods([defaultMethod])
      localStorage.setItem("miauzly_payment_methods", JSON.stringify([defaultMethod]))
    }
  }, [])

  const handleAddPaymentMethod = () => {
    if (!cardNumber || !expiry || !cvc || !cardName) return

    const newMethod: PaymentMethod = {
      id: `card_${Date.now()}`,
      type: "Kreditkarte",
      last4: cardNumber.slice(-4),
      expiry: expiry,
      isDefault: paymentMethods.length === 0,
    }

    const updated = [...paymentMethods, newMethod]
    setPaymentMethods(updated)
    localStorage.setItem("miauzly_payment_methods", JSON.stringify(updated))

    // Reset form
    setCardNumber("")
    setExpiry("")
    setCvc("")
    setCardName("")
    setShowAddDialog(false)
  }

  const handleRemovePaymentMethod = (id: string) => {
    const updated = paymentMethods.filter((method) => method.id !== id)
    setPaymentMethods(updated)
    localStorage.setItem("miauzly_payment_methods", JSON.stringify(updated))
  }

  const handleSetDefault = (id: string) => {
    const updated = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))
    setPaymentMethods(updated)
    localStorage.setItem("miauzly_payment_methods", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center h-16 px-4 max-w-screen-xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Zahlungsmittel</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        {/* Add Payment Method Button */}
        <Button onClick={() => setShowAddDialog(true)} className="w-full gap-2">
          <Plus className="w-5 h-5" />
          Zahlungsmittel hinzufügen
        </Button>

        {/* Payment Methods List */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{method.type}</h3>
                      {method.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Standard</span>
                      )}
                    </div>
                    {method.last4 && <p className="text-sm text-muted-foreground mt-1">•••• {method.last4}</p>}
                    {method.expiry && <p className="text-xs text-muted-foreground mt-1">Gültig bis {method.expiry}</p>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)} className="text-xs">
                        Als Standard
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Keine Zahlungsmittel hinterlegt</p>
          </div>
        )}
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zahlungsmittel hinzufügen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name auf Karte</Label>
              <Input
                id="cardName"
                placeholder="Max Mustermann"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Kartennummer</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Gültig bis</Label>
                <Input
                  id="expiry"
                  placeholder="MM/JJ"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  type="password"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleAddPaymentMethod}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}
