import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/lib/movies"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
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
  )
}
