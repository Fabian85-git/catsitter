import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-4 p-4">
          <Link href="/" className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Design System</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* Colors Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <div className="w-full h-24 bg-black rounded-lg mb-2"></div>
              <p className="font-semibold">Black</p>
              <p className="text-sm text-muted-foreground">#000000</p>
            </div>
            <div>
              <div className="w-full h-24 bg-white border rounded-lg mb-2"></div>
              <p className="font-semibold">White</p>
              <p className="text-sm text-muted-foreground">#FFFFFF</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFA500] rounded-lg mb-2"></div>
              <p className="font-semibold">Primary</p>
              <p className="text-sm text-muted-foreground">#FFA500</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#3D3D3D] rounded-lg mb-2"></div>
              <p className="font-semibold">Grey/Font</p>
              <p className="text-sm text-muted-foreground">#3D3D3D</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#5B8FD3] rounded-lg mb-2"></div>
              <p className="font-semibold">Blue</p>
              <p className="text-sm text-muted-foreground">#5B8FD3</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#DC2626] rounded-lg mb-2"></div>
              <p className="font-semibold">Red/Warning</p>
              <p className="text-sm text-muted-foreground">#DC2626</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#22C55E] rounded-lg mb-2"></div>
              <p className="font-semibold">Green/Success</p>
              <p className="text-sm text-muted-foreground">#22C55E</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Font</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Inter</h3>
              <p className="text-muted-foreground mb-4">
                Inter is a variable font family carefully crafted & designed for computer screens.
              </p>
              <div className="space-y-2">
                <p className="text-3xl font-bold">The quick brown fox</p>
                <p className="text-2xl font-semibold">The quick brown fox</p>
                <p className="text-xl font-medium">The quick brown fox</p>
                <p className="text-lg">The quick brown fox</p>
                <p className="text-base">The quick brown fox</p>
                <p className="text-sm">The quick brown fox</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Button</h2>
          <div className="space-y-8">
            {/* Filled Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Filled</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Default</p>
                  <Button className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-full">Button</Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hover</p>
                  <Button className="w-full bg-[#FF8C00] hover:bg-[#FF8C00] text-white rounded-full">Button</Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Press</p>
                  <Button className="w-full bg-[#E67E00] hover:bg-[#E67E00] text-white rounded-full">Button</Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <Button
                    disabled
                    className="w-full bg-[#FFD699] hover:bg-[#FFD699] text-white rounded-full opacity-50"
                  >
                    Button
                  </Button>
                </div>
              </div>
            </div>

            {/* Outlined Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Outlined</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Default</p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#FFA500] text-[#FFA500] hover:bg-[#FFF5E6] rounded-full bg-transparent"
                  >
                    Button
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hover</p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#FFA500] text-[#FFA500] bg-[#FFF5E6] hover:bg-[#FFF5E6] rounded-full"
                  >
                    Button
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Press</p>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#FFA500] text-[#FFA500] bg-[#FFEBCC] hover:bg-[#FFEBCC] rounded-full"
                  >
                    Button
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full border-2 border-[#FFD699] text-[#FFD699] rounded-full opacity-50 bg-transparent"
                  >
                    Button
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Link</h2>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="text-sm text-muted-foreground">Default</span>
              <Link href="#" className="text-foreground hover:text-primary flex items-center gap-2">
                Alle Termine anzeigen
                <span>→</span>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="text-sm text-muted-foreground">Hover</span>
              <Link href="#" className="text-primary flex items-center gap-2">
                Alle Termine anzeigen
                <span>→</span>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="text-sm text-muted-foreground">Press</span>
              <Link href="#" className="text-[#E67E00] flex items-center gap-2">
                Alle Termine anzeigen
                <span>→</span>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span className="text-sm text-muted-foreground">Disabled</span>
              <span className="text-muted-foreground/50 flex items-center gap-2">
                Alle Termine anzeigen
                <span>→</span>
              </span>
            </div>
          </div>
        </section>

        {/* UI Components Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">UI Components</h2>
          <div className="space-y-6">
            {/* Badge */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Badges</h3>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-[#5B8FD3] text-white text-xs rounded-full">Bezahlt</span>
                <span className="px-3 py-1 bg-[#22C55E] text-white text-xs rounded-full">Tausch</span>
                <span className="px-3 py-1 bg-[#FFA500] text-white text-xs rounded-full">Offen</span>
              </div>
            </div>

            {/* Profile Card */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Profile Card</h3>
              <div className="max-w-md border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFA500] to-[#FF8C00]"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">Sandra</p>
                      <span className="px-2 py-0.5 bg-[#5B8FD3] text-white text-xs rounded-full">Bezahlt</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Katzen: Joe & Zen</p>
                    <p className="text-xs text-muted-foreground">ca. 450m entfernt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Bottom Navigation</h3>
              <div className="max-w-md border rounded-lg p-4 bg-white">
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-[#FFA500] rounded"></div>
                    <span className="text-xs">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <span className="text-xs text-muted-foreground">Termine</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <span className="text-xs text-muted-foreground">Marktplatz</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <span className="text-xs text-muted-foreground">Forum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Spacing</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">4px</div>
              <div className="h-8 w-1 bg-foreground"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">8px</div>
              <div className="h-8 w-2 bg-foreground"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">12px</div>
              <div className="h-8 w-3 bg-foreground"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">16px</div>
              <div className="h-8 w-4 bg-foreground"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">24px</div>
              <div className="h-8 w-6 bg-foreground"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-muted-foreground">32px</div>
              <div className="h-8 w-8 bg-foreground"></div>
            </div>
          </div>
        </section>

        {/* Border Radius Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="w-full h-24 bg-[#FFA500] rounded-none mb-2"></div>
              <p className="text-sm">None (0px)</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFA500] rounded-sm mb-2"></div>
              <p className="text-sm">Small (4px)</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFA500] rounded-lg mb-2"></div>
              <p className="text-sm">Medium (8px)</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFA500] rounded-full mb-2"></div>
              <p className="text-sm">Full (9999px)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
