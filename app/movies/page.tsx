"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Edit, Trash2, Film, Upload, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchMovies, addMovieAPI, updateMovieAPI, deleteMovieAPI } from "@/lib/api"
import type { Movie } from "@/lib/movies"

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    rating: 5,
    review_user: "",
    genre: "",
    year: new Date().getFullYear(),
  })

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Animation", "Documentary"]

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    setLoading(true)
    const fetchedMovies = await fetchMovies()
    setMovies(fetchedMovies)
    setLoading(false)
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setUploadedImage(imageUrl)
        setFormData({ ...formData, image_url: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage("")
    setFormData({ ...formData, image_url: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingMovie) {
        const updatedMovie = await updateMovieAPI(editingMovie.id, formData)
        if (updatedMovie) {
          setMovies(movies.map((m) => (m.id === editingMovie.id ? updatedMovie : m)))
          // Dispatch event for home page to update
          window.dispatchEvent(new CustomEvent("moviesUpdated"))
        }
      } else {
        const newMovie = await addMovieAPI(formData)
        if (newMovie) {
          setMovies([newMovie, ...movies])
          // Dispatch event for home page to update
          window.dispatchEvent(new CustomEvent("moviesUpdated"))
        }
      }
      resetForm()
    } catch (error) {
      console.error("Error submitting movie:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie)
    setFormData({
      title: movie.title,
      description: movie.description,
      image_url: movie.image_url,
      rating: movie.rating,
      review_user: movie.review_user,
      genre: movie.genre,
      year: movie.year,
    })
    setUploadedImage(movie.image_url)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    const success = await deleteMovieAPI(id)
    if (success) {
      setMovies(movies.filter((m) => m.id !== id))
      // Dispatch event for home page to update
      window.dispatchEvent(new CustomEvent("moviesUpdated"))
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      rating: 5,
      review_user: "",
      genre: "",
      year: new Date().getFullYear(),
    })
    setUploadedImage("")
    setEditingMovie(null)
    setIsDialogOpen(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Movies</h1>
            <p className="text-gray-600 mt-1">
              {movies.length === 0
                ? "Start building your movie collection! Added movies will automatically appear on the Home page."
                : `${movies.length} movies in your collection`}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMovie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Avengers: Endgame"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max="2030"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Synopsis</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Tell us about this movie..."
                    required
                  />
                </div>

                {/* Image Upload Section */}
                <div>
                  <Label>Movie Poster</Label>
                  <div className="mt-2">
                    {uploadedImage ? (
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Movie poster preview"
                          className="w-32 h-48 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                          onClick={removeImage}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload movie poster</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      required={!editingMovie && !uploadedImage}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => setFormData({ ...formData, genre: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating (1-10)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="review_user">Your Review</Label>
                  <Textarea
                    id="review_user"
                    value={formData.review_user}
                    onChange={(e) => setFormData({ ...formData, review_user: e.target.value })}
                    rows={3}
                    placeholder="Share your thoughts about this movie..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={submitting}>
                    {submitting ? "Saving..." : editingMovie ? "Update Movie" : "Add Movie"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {movies.length > 0 && (
          <div className="mb-6">
            <Input
              placeholder="Search movies by title or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        )}

        {movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <Film className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Movies Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your movie collection! Click "Add Movie" to add your first film. Movies you add will
              automatically appear on the Home page.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Movie
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/3] relative">
                  <img
                    src={movie.image_url || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-1">{movie.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(movie)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(movie.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{movie.genre}</Badge>
                    <span className="text-sm text-gray-500">{movie.year}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{movie.rating}/10</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{movie.description}</p>
                  <p className="text-sm text-gray-800 line-clamp-3">
                    <strong>Review:</strong> {movie.review_user}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMovies.length === 0 && movies.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
