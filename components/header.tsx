import Link from "next/link"
import { Film } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold">CineBox</span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link href="/" className="hover:text-emerald-300 transition-colors font-medium">
              Home
            </Link>
            <Link href="/movies" className="hover:text-emerald-300 transition-colors font-medium">
              Movies
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
