"use client"

import type { ReactNode } from "react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps?: number
  showLogo?: boolean
  useCard?: boolean
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps = 7,
  showLogo = false,
  useCard = true,
}: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with optional logo and progress */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {showLogo && (
            <div className="flex items-center justify-center mb-4">
              <Image src="/miauzly-logo-blau.png" alt="Miauzly" width={150} height={40} className="h-8 w-auto" />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Schritt {currentStep} von {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-[#9AB4E5] [&>div]:bg-[#5682D3]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {useCard ? (
          <div className="w-full max-w-2xl animate-in fade-in duration-500">{children}</div>
        ) : (
          <div className="w-full max-w-2xl animate-in fade-in duration-500">{children}</div>
        )}
      </div>
    </div>
  )
}
