import type { Movie } from "./movies"
import { pool } from "./database"

// Mock data for development
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller about dreams within dreams",
    image_url: "/placeholder.svg?height=400&width=300",
    rating: 8.8,
    review_user: "Amazing movie with incredible visual effects!",
    genre: "Sci-Fi",
    year: 2010,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "The Dark Knight",
    description: "Batman faces the Joker in this epic superhero film",
    image_url: "/placeholder.svg?height=400&width=300",
    rating: 9.0,
    review_user: "Heath Ledger's performance is legendary!",
    genre: "Action",
    year: 2008,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A space odyssey about love, time, and survival",
    image_url: "/placeholder.svg?height=400&width=300",
    rating: 8.6,
    review_user: "Scientifically accurate and emotionally powerful",
    genre: "Sci-Fi",
    year: 2014,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

const movieStorage = [...mockMovies]
let nextId = 4

const API_BASE = "/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Fetch movies - works with or without database
export async function fetchMovies(): Promise<Movie[]> {
  try {
    // Try database first
    const [rows] = await pool.execute("SELECT * FROM movies ORDER BY created_at DESC")
    return rows as Movie[]
  } catch (error) {
    // Fallback to mock data
    console.log("📱 Using mock data for development")
    return movieStorage
  }
}

// Add movie - works with or without database
export async function addMovieAPI(movieData: Omit<Movie, "id" | "created_at" | "updated_at">): Promise<Movie | null> {
  try {
    // Try database first
    const [result] = await pool.execute(
      "INSERT INTO movies (title, description, image_url, rating, review_user, genre, year) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        movieData.title,
        movieData.description,
        movieData.image_url,
        movieData.rating,
        movieData.review_user,
        movieData.genre,
        movieData.year,
      ],
    )

    const insertResult = result as any
    const newMovie: Movie = {
      id: insertResult.insertId,
      ...movieData,
      created_at: new Date(),
      updated_at: new Date(),
    }
    return newMovie
  } catch (error) {
    // Fallback to mock storage
    console.log("📱 Adding to mock storage")
    const newMovie: Movie = {
      id: nextId++,
      ...movieData,
      created_at: new Date(),
      updated_at: new Date(),
    }
    movieStorage.unshift(newMovie)
    return newMovie
  }
}

// Update movie - works with or without database
export async function updateMovieAPI(id: number, movieData: Partial<Movie>): Promise<Movie | null> {
  try {
    // Try database first
    await pool.execute(
      "UPDATE movies SET title=?, description=?, image_url=?, rating=?, review_user=?, genre=?, year=?, updated_at=NOW() WHERE id=?",
      [
        movieData.title,
        movieData.description,
        movieData.image_url,
        movieData.rating,
        movieData.review_user,
        movieData.genre,
        movieData.year,
        id,
      ],
    )

    const [rows] = await pool.execute("SELECT * FROM movies WHERE id=?", [id])
    const movies = rows as Movie[]
    return movies[0] || null
  } catch (error) {
    // Fallback to mock storage
    console.log("📱 Updating mock storage")
    const index = movieStorage.findIndex((m) => m.id === id)
    if (index !== -1) {
      movieStorage[index] = { ...movieStorage[index], ...movieData, updated_at: new Date() }
      return movieStorage[index]
    }
    return null
  }
}

// Delete movie - works with or without database
export async function deleteMovieAPI(id: number): Promise<boolean> {
  try {
    // Try database first
    await pool.execute("DELETE FROM movies WHERE id=?", [id])
    return true
  } catch (error) {
    // Fallback to mock storage
    console.log("📱 Deleting from mock storage")
    const index = movieStorage.findIndex((m) => m.id === id)
    if (index !== -1) {
      movieStorage.splice(index, 1)
      return true
    }
    return false
  }
}
