import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"
import "./globals.css"
import SmoothCursor from "@/components/magicui/smooth-cursor"

export const metadata: Metadata = {
  title: "StyleNest - Premium Fashion Destination",
  description: "Discover curated fashion collections at StyleNest - where style meets sophistication",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <CartProvider>{children}</CartProvider>
          <SmoothCursor />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
