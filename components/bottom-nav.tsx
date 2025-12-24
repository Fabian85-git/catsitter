"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Calendar, Store, MessageSquare } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sitter", label: "Sitter", icon: PawPrint },
    { href: "/termine", label: "Termine", icon: Calendar },
    { href: "/marktplatz", label: "Marktplatz", icon: Store },
    { href: "/forum", label: "Forum", icon: MessageSquare },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors"
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
