import type { Movie } from "./movies"

const API_BASE = "/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Fetch all movies from MySQL database
export async function fetchMovies(filter?: string): Promise<Movie[]> {
  try {
    const url = filter ? `${API_BASE}/movies?filter=${filter}` : `${API_BASE}/movies`
    const response = await fetch(url)
    const result: ApiResponse<Movie[]> = await response.json()

    if (result.success && result.data) {
      return result.data
    }
    throw new Error(result.error || "Failed to fetch movies")
  } catch (error) {
    console.error("Error fetching movies:", error)
    return []
  }
}

// Add new movie to MySQL database
export async function addMovieAPI(movieData: Omit<Movie, "id" | "created_at" | "updated_at">): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_BASE}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })

    const result: ApiResponse<Movie> = await response.json()

    if (result.success && result.data) {
      return result.data
    }
    throw new Error(result.error || "Failed to add movie")
  } catch (error) {
    console.error("Error adding movie:", error)
    return null
  }
}

// Update movie in MySQL database
export async function updateMovieAPI(
  id: number,
  movieData: Omit<Movie, "id" | "created_at" | "updated_at">,
): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_BASE}/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })

    const result: ApiResponse<Movie> = await response.json()

    if (result.success && result.data) {
      return result.data
    }
    throw new Error(result.error || "Failed to update movie")
  } catch (error) {
    console.error("Error updating movie:", error)
    return null
  }
}

// Delete movie from MySQL database
export async function deleteMovieAPI(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/movies/${id}`, {
      method: "DELETE",
    })

    const result: ApiResponse<null> = await response.json()
    return result.success
  } catch (error) {
    console.error("Error deleting movie:", error)
    return false
  }
}
