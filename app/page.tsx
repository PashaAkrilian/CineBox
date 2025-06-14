"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
import Link from "next/link"
import { fetchMovies } from "@/lib/api"
import type { Movie } from "@/lib/movies"
import MovieCard from "@/components/movie-card"

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      setLoading(true)
      const fetchedMovies = await fetchMovies()
      setMovies(fetchedMovies)
    } catch (error) {
      console.log("Using fallback data")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  // Listen for movie updates
  useEffect(() => {
    const handleMovieUpdate = () => {
      loadMovies()
    }

    window.addEventListener("moviesUpdated", handleMovieUpdate)
    return () => window.removeEventListener("moviesUpdated", handleMovieUpdate)
  }, [])

  const featuredMovies = movies.slice(0, 6)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to CineBox!</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover, rate, and discuss your favorite movies. Your ultimate cinematic companion.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
            <Link href="/movies">
              <Film className="w-5 h-5 mr-2" />
              Explore All Movies
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Movies</h2>
          <div className="w-24 h-1 bg-emerald-600 rounded"></div>
        </div>

        {featuredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No featured movies available. Add some movies to get started!</p>
            <Button asChild className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/movies">Add Your First Movie</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CineBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
