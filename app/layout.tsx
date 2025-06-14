import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { initializeDatabase } from "@/lib/database"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CineBox - Movie Rating & Review Platform",
  description: "Discover, rate, and review your favorite movies with CineBox",
    generator: 'v0.dev'
}

// Initialize database connection
initializeDatabase().catch(console.error)

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
