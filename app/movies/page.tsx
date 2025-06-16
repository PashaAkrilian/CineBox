"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Plus,
  Edit,
  Trash2,
  Film,
  Upload,
  X,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fetchMovies, addMovieAPI, updateMovieAPI, deleteMovieAPI } from "@/lib/api"
import type { Movie } from "@/lib/movies"

interface FormErrors {
  title?: string
  description?: string
  genre?: string
  review_user?: string
  rating?: string
  year?: string
  image?: string
  general?: string
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string>("")
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string>("")
  const [submitSuccess, setSubmitSuccess] = useState<string>("")
  const [isValidating, setIsValidating] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)
  const validationTimeoutRef = useRef<NodeJS.Timeout>()

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

  // Clear messages after 5 seconds
  useEffect(() => {
    if (submitError || submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitError("")
        setSubmitSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitError, submitSuccess])

  // Cleanup validation timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current)
      }
    }
  }, [])

  const loadMovies = async () => {
    setLoading(true)
    try {
      const fetchedMovies = await fetchMovies()
      setMovies(Array.isArray(fetchedMovies) ? fetchedMovies : [])
    } catch (error) {
      console.error("Error loading movies:", error)
      setSubmitError("Failed to load movies. Please refresh the page.")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Debounced validation function
  const debouncedValidation = useCallback((fieldName: string, value: any) => {
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current)
    }

    validationTimeoutRef.current = setTimeout(() => {
      validateField(fieldName, value)
    }, 300)
  }, [])

  // Individual field validation
  const validateField = (fieldName: string, value: any): string => {
    let error = ""

    switch (fieldName) {
      case "title":
        if (!value || typeof value !== "string") {
          error = "Movie title is required"
        } else if (value.trim().length === 0) {
          error = "Movie title cannot be empty"
        } else if (value.trim().length < 2) {
          error = "Title must be at least 2 characters"
        } else if (value.length > 100) {
          error = "Title must be less than 100 characters"
        }
        break

      case "description":
        if (!value || typeof value !== "string") {
          error = "Synopsis is required"
        } else if (value.trim().length === 0) {
          error = "Synopsis cannot be empty"
        } else if (value.trim().length < 10) {
          error = "Synopsis must be at least 10 characters"
        } else if (value.length > 1000) {
          error = "Synopsis must be less than 1000 characters"
        }
        break

      case "genre":
        if (!value || !genres.includes(value)) {
          error = "Please select a valid genre"
        }
        break

      case "review_user":
        if (!value || typeof value !== "string") {
          error = "Your review is required"
        } else if (value.trim().length === 0) {
          error = "Review cannot be empty"
        } else if (value.trim().length < 5) {
          error = "Review must be at least 5 characters"
        } else if (value.length > 500) {
          error = "Review must be less than 500 characters"
        }
        break

      case "rating":
        const numRating = Number(value)
        if (isNaN(numRating)) {
          error = "Rating must be a valid number"
        } else if (numRating < 1 || numRating > 10) {
          error = "Rating must be between 1 and 10"
        }
        break

      case "year":
        const numYear = Number(value)
        const currentYear = new Date().getFullYear()
        if (isNaN(numYear)) {
          error = "Year must be a valid number"
        } else if (numYear < 1900 || numYear > currentYear + 5) {
          error = `Year must be between 1900 and ${currentYear + 5}`
        }
        break

      case "image":
        if (!editingMovie && !uploadedImage) {
          error = "Movie poster is required"
        }
        break
    }

    // Update form errors
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error || undefined,
    }))

    return error
  }

  // Comprehensive form validation
  const validateForm = (): boolean => {
    setIsValidating(true)
    const errors: FormErrors = {}

    // Validate all fields
    const titleError = validateField("title", formData.title)
    const descError = validateField("description", formData.description)
    const genreError = validateField("genre", formData.genre)
    const reviewError = validateField("review_user", formData.review_user)
    const ratingError = validateField("rating", formData.rating)
    const yearError = validateField("year", formData.year)
    const imageError = validateField("image", uploadedImage)

    if (titleError) errors.title = titleError
    if (descError) errors.description = descError
    if (genreError) errors.genre = genreError
    if (reviewError) errors.review_user = reviewError
    if (ratingError) errors.rating = ratingError
    if (yearError) errors.year = yearError
    if (imageError) errors.image = imageError

    setFormErrors(errors)
    setIsValidating(false)

    return Object.keys(errors).length === 0
  }

  // Handle field changes with validation
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))

    // Mark field as touched
    setTouchedFields((prev) => new Set([...prev, fieldName]))

    // Clear submit errors when user starts typing
    if (submitError) setSubmitError("")

    // Only validate if field has been touched
    if (touchedFields.has(fieldName) || formErrors[fieldName as keyof FormErrors]) {
      debouncedValidation(fieldName, value)
    }
  }

  // Enhanced image upload with better validation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Clear previous errors
    setFormErrors((prev) => ({ ...prev, image: undefined }))

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        image: "Please upload JPG, JPEG, or PNG files only! Current file type: " + file.type,
      }))
      return
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setFormErrors((prev) => ({
        ...prev,
        image: `File size (${sizeMB}MB) exceeds 2MB limit!`,
      }))
      return
    }

    // Validate image dimensions (optional)
    const img = new Image()
    img.onload = () => {
      if (img.width < 100 || img.height < 100) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image must be at least 100x100 pixels",
        }))
        return
      }

      // All validations passed
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setUploadedImage(imageUrl)
        setFormData((prev) => ({ ...prev, image_url: imageUrl }))
        setFormErrors((prev) => ({ ...prev, image: undefined }))
      }
      reader.onerror = () => {
        setFormErrors((prev) => ({ ...prev, image: "Failed to read image file" }))
      }
      reader.readAsDataURL(file)
    }
    img.onerror = () => {
      setFormErrors((prev) => ({ ...prev, image: "Invalid image file" }))
    }
    img.src = URL.createObjectURL(file)
  }

  const removeImage = () => {
    setUploadedImage("")
    setImageFile(null)
    setFormData((prev) => ({ ...prev, image_url: "" }))
    setFormErrors((prev) => ({ ...prev, image: undefined }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous messages
    setSubmitError("")
    setSubmitSuccess("")

    // Mark all fields as touched for validation
    const allFields = new Set(["title", "description", "genre", "review_user", "rating", "year", "image"])
    setTouchedFields(allFields)

    // Validate form
    if (!validateForm()) {
      setSubmitError("Please fix the errors above before submitting.")
      return
    }

    setSubmitting(true)

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        review_user: formData.review_user.trim(),
        rating: Number(formData.rating),
        year: Number(formData.year),
      }

      if (editingMovie) {
        const updatedMovie = await updateMovieAPI(editingMovie.id, submitData)
        if (updatedMovie) {
          setMovies((prev) => prev.map((m) => (m.id === editingMovie.id ? updatedMovie : m)))
          setSubmitSuccess("Movie updated successfully!")
          window.dispatchEvent(new CustomEvent("moviesUpdated"))
          setTimeout(() => resetForm(), 1500)
        } else {
          throw new Error("Failed to update movie - no response from server")
        }
      } else {
        const newMovie = await addMovieAPI(submitData)
        if (newMovie) {
          setMovies((prev) => [newMovie, ...prev])
          setSubmitSuccess("Movie added successfully!")
          window.dispatchEvent(new CustomEvent("moviesUpdated"))
          setTimeout(() => resetForm(), 1500)
        } else {
          throw new Error("Failed to add movie - no response from server")
        }
      }
    } catch (error) {
      console.error("Error submitting movie:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setSubmitError(`Failed to save movie: ${errorMessage}. Please check your database connection and try again.`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie)
    setFormData({
      title: movie.title || "",
      description: movie.description || "",
      image_url: movie.image_url || "",
      rating: movie.rating || 5,
      review_user: movie.review_user || "",
      genre: movie.genre || "",
      year: movie.year || new Date().getFullYear(),
    })
    setUploadedImage(movie.image_url || "")
    setFormErrors({})
    setTouchedFields(new Set())
    setSubmitError("")
    setSubmitSuccess("")
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this movie? This action cannot be undone.")) {
      return
    }

    try {
      const success = await deleteMovieAPI(id)
      if (success) {
        setMovies((prev) => prev.filter((m) => m.id !== id))
        setSubmitSuccess("Movie deleted successfully!")
        window.dispatchEvent(new CustomEvent("moviesUpdated"))
      } else {
        throw new Error("Failed to delete movie")
      }
    } catch (error) {
      console.error("Error deleting movie:", error)
      setSubmitError("Failed to delete movie. Please try again.")
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
    setImageFile(null)
    setEditingMovie(null)
    setFormErrors({})
    setTouchedFields(new Set())
    setSubmitError("")
    setSubmitSuccess("")
    setIsDialogOpen(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your movie collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {submitError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{submitError}</AlertDescription>
          </Alert>
        )}

        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{submitSuccess}</AlertDescription>
          </Alert>
        )}

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Movie Collection
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              {movies.length === 0
                ? "Start building your cinematic journey! Add your first movie below."
                : `${movies.length} ${movies.length === 1 ? "movie" : "movies"} in your collection`}
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => resetForm()}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Movie
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
              <DialogHeader className="pb-6">
                <DialogTitle className="text-2xl font-bold text-slate-800">
                  {editingMovie ? "Edit Movie" : "Add New Movie"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Title & Year Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                      Movie Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleFieldChange("title", e.target.value)}
                      onBlur={() => setTouchedFields((prev) => new Set([...prev, "title"]))}
                      placeholder="e.g., The Dark Knight"
                      className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${
                        formErrors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                      maxLength={100}
                    />
                    {formErrors.title && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.title}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-sm font-semibold text-slate-700">
                      Year *
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      value={formData.year}
                      onChange={(e) =>
                        handleFieldChange("year", Number.parseInt(e.target.value) || new Date().getFullYear())
                      }
                      onBlur={() => setTouchedFields((prev) => new Set([...prev, "year"]))}
                      className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${
                        formErrors.year ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {formErrors.year && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.year}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                    Synopsis * ({formData.description.length}/1000)
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    onBlur={() => setTouchedFields((prev) => new Set([...prev, "description"]))}
                    rows={4}
                    placeholder="Tell us about this movie's plot, themes, and what makes it special..."
                    className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none transition-colors ${
                      formErrors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={1000}
                  />
                  {formErrors.description && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.description}
                    </p>
                  )}
                </div>

                {/* Movie Poster Upload - JPG, JPEG, PNG Only */}
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Movie Poster * (JPG, JPEG, PNG only, max 2MB)</Label>
                  <div className="mt-2">
                    {uploadedImage ? (
                      <div className="relative inline-block">
                        <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 shadow-lg">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Movie poster preview"
                            className="w-48 h-72 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                              onClick={removeImage}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 bg-slate-50 ${
                          formErrors.image
                            ? "border-red-300 hover:border-red-400 hover:bg-red-50"
                            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload
                          className={`w-12 h-12 mx-auto mb-4 ${formErrors.image ? "text-red-400" : "text-slate-400"}`}
                        />
                        <p
                          className={`text-lg font-medium mb-2 ${formErrors.image ? "text-red-700" : "text-slate-700"}`}
                        >
                          Upload Movie Poster
                        </p>
                        <p className="text-sm text-slate-500 mb-1">Click to browse or drag and drop</p>
                        <p className="text-xs text-slate-400">JPG, JPEG, PNG files only, maximum 2MB, minimum 100x100px</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {formErrors.image && (
                      <p className="text-red-600 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.image}
                      </p>
                    )}
                  </div>
                </div>

                {/* Genre & Rating Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre" className="text-sm font-semibold text-slate-700">
                      Genre *
                    </Label>
                    <Select value={formData.genre} onValueChange={(value) => handleFieldChange("genre", value)}>
                      <SelectTrigger
                        className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${
                          formErrors.genre ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.genre && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.genre}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="rating" className="text-sm font-semibold text-slate-700">
                      Rating (1-10) *
                    </Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleFieldChange("rating", Number.parseFloat(e.target.value) || 5)}
                      onBlur={() => setTouchedFields((prev) => new Set([...prev, "rating"]))}
                      className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-colors ${
                        formErrors.rating ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {formErrors.rating && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.rating}
                      </p>
                    )}
                  </div>
                </div>

                {/* Review */}
                <div>
                  <Label htmlFor="review_user" className="text-sm font-semibold text-slate-700">
                    Your Review * ({formData.review_user.length}/500)
                  </Label>
                  <Textarea
                    id="review_user"
                    value={formData.review_user}
                    onChange={(e) => handleFieldChange("review_user", e.target.value)}
                    onBlur={() => setTouchedFields((prev) => new Set([...prev, "review_user"]))}
                    rows={4}
                    placeholder="Share your thoughts, favorite scenes, or what made this movie memorable for you..."
                    className={`mt-1 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none transition-colors ${
                      formErrors.review_user ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    maxLength={500}
                  />
                  {formErrors.review_user && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.review_user}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={submitting}
                    className="px-6 py-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={submitting || isValidating}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Saving...
                      </>
                    ) : editingMovie ? (
                      "Update Movie"
                    ) : (
                      "Add Movie"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        {movies.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search movies by title or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border-slate-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Film className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Start Your Collection</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
              Add your first movie to begin building your personal cinema database. Every great collection starts with
              one film!
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Movie
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl border-0 shadow-lg hover:scale-105"
              >
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={movie.image_url || "/placeholder.svg?height=400&width=300"}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(movie)}
                      className="bg-white/90 hover:bg-white text-slate-700 rounded-full w-10 h-10 p-0 shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(movie.id)}
                      className="bg-red-500/90 hover:bg-red-600 text-white rounded-full w-10 h-10 p-0 shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">{movie.title}</CardTitle>
                    <span className="text-sm text-slate-500 font-medium">{movie.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                      {movie.genre}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-bold text-slate-700">{movie.rating}/10</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{movie.description}</p>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-sm text-slate-700 line-clamp-3">
                      <span className="font-semibold text-slate-800">Review:</span> {movie.review_user}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMovies.length === 0 && movies.length > 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No movies found</h3>
            <p className="text-slate-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
