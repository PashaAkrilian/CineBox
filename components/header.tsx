"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">CineBox</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Movies
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/movies">Browse Movies</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
