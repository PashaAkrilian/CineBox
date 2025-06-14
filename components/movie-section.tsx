import Link from "next/link"
import { Star, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/lib/movies"

interface MovieSectionProps {
  title: string
  movies: Movie[]
  viewAllLink: string
}

export default function MovieSection({ title, movies, viewAllLink }: MovieSectionProps) {
  // Jika tidak ada film, tampilkan empty state
  if (movies.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Film di {title}</h3>
          <p className="text-gray-500 mb-4">
            {title === "Popular Films" && "Film dengan rating tertinggi akan muncul di sini"}
            {title === "New Releases" && "Film dengan tahun rilis terbaru akan muncul di sini"}
            {title === "Top Rated" && "Film dengan rating ≥ 8.5 akan muncul di sini"}
          </p>
          <Button asChild>
            <Link href="/movies">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Film
            </Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button variant="ghost" asChild>
          <Link href={viewAllLink} className="flex items-center">
            View All ({movies.length})
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.slice(0, 6).map((movie) => (
          <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="aspect-[2/3] relative">
              <img
                src={movie.image_url || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <CardContent className="p-3">
              <h3 className="font-semibold text-sm line-clamp-1 mb-1">{movie.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>{movie.year}</span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{movie.rating}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {movie.genre}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
