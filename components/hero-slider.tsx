"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTopRatedMovies } from "@/lib/movies"
import Link from "next/link"

export default function HeroSlider() {
  const [featuredMovies, setFeaturedMovies] = useState(() => getTopRatedMovies().slice(0, 3))
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const updateFeaturedMovies = () => {
      const topMovies = getTopRatedMovies().slice(0, 3)
      setFeaturedMovies(topMovies)
      console.log("🎯 Hero slider diupdate dengan", topMovies.length, "film")
    }

    // Listen for movie updates
    window.addEventListener("moviesUpdated", updateFeaturedMovies)

    return () => {
      window.removeEventListener("moviesUpdated", updateFeaturedMovies)
    }
  }, [])

  useEffect(() => {
    if (featuredMovies.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [featuredMovies.length])

  // Jika belum ada film, tampilkan welcome screen
  if (featuredMovies.length === 0) {
    return (
      <div className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Star className="w-12 h-12 text-yellow-400" />
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-blue-400">CineBox</span>
            </h1>

            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Mulai koleksi film favorit Anda! Tambahkan film, berikan rating, dan tulis review. Film yang Anda
              tambahkan akan otomatis muncul di semua section.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/movies">
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Film Pertama
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/browse">Jelajahi Film</Link>
              </Button>
            </div>

            <div className="mt-12 text-sm opacity-70">
              <p>💡 Tips: Film dengan rating ≥ 8.5 akan muncul di section "Top Rated"</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
  }

  const currentMovie = featuredMovies[currentSlide]

  return (
    <div className="relative h-[70vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img
          src={currentMovie.image_url || "/placeholder.svg"}
          alt={currentMovie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {currentMovie.genre}
              </Badge>
              <span className="text-sm opacity-80">{currentMovie.year}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-semibold">{currentMovie.rating}/10</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-4 leading-tight">{currentMovie.title}</h1>

            <p className="text-lg opacity-90 mb-8 leading-relaxed">{currentMovie.description}</p>

            <div className="flex space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-gray-900"
              >
                Add to List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {featuredMovies.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
