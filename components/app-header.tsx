"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Calendar, Store, MessageSquare } from "lucide-react"

export function AppHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sitter", label: "Sitter", icon: PawPrint },
    { href: "/termine", label: "Termine", icon: Calendar },
    { href: "/marktplatz", label: "Marktplatz", icon: Store },
    { href: "/forum", label: "Forum", icon: MessageSquare },
  ]

  return (
    <header className={`sticky top-0 z-40 bg-white border-b border-border ${!isHomePage ? "hidden md:block" : ""}`}>
      <div className="flex items-center justify-between h-16 px-4 max-w-screen-xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/miauzly-logo-color.png" alt="Miouzly Logo" width={200} height={50} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <User className="w-7 h-7" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
