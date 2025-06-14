import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CineBox - Movie Rating & Review Platform",
  description: "Discover, rate, and review your favorite movies with CineBox",
  generator: "v0.dev",
}

// Initialize database in background - non-blocking
if (typeof window === "undefined") {
  import("@/lib/database").then(({ initializeDatabase }) => {
    initializeDatabase().catch(() => {
      console.log("🔧 Running without database - using mock data")
    })
  })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
