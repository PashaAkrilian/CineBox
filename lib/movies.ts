export interface Movie {
  id: number
  title: string
  description: string
  image_url: string
  rating: number
  review_user: string
  genre: string
  year: number
  created_at: string
}

// Start with empty array - no initial movies
const movies: Movie[] = []

let nextId = 1

export function getAllMovies(): Movie[] {
  return [...movies].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getPopularMovies(): Movie[] {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6)
}

export function getNewReleases(): Movie[] {
  return [...movies].sort((a, b) => b.year - a.year).slice(0, 6)
}

export function getTopRatedMovies(): Movie[] {
  return [...movies].filter((movie) => movie.rating >= 8.5).slice(0, 6)
}

// Function to notify all components that movies have been updated
function dispatchMoviesUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("moviesUpdated"))
  }
}

export function addMovie(movieData: Omit<Movie, "id" | "created_at">): Movie {
  const newMovie: Movie = {
    ...movieData,
    id: nextId++,
    created_at: new Date().toISOString(),
  }
  movies.push(newMovie)
  console.log("🎬 New movie added:", newMovie.title)
  console.log("📊 Total movies now:", movies.length)
  dispatchMoviesUpdated() // Notify all components to update
  return newMovie
}

export function updateMovie(id: number, movieData: Omit<Movie, "id" | "created_at">): Movie {
  const index = movies.findIndex((movie) => movie.id === id)
  if (index === -1) {
    throw new Error("Movie not found")
  }

  const updatedMovie: Movie = {
    ...movieData,
    id,
    created_at: movies[index].created_at,
  }

  movies[index] = updatedMovie
  dispatchMoviesUpdated()
  return updatedMovie
}

export function deleteMovie(id: number): void {
  const index = movies.findIndex((movie) => movie.id === id)
  if (index === -1) {
    throw new Error("Movie not found")
  }
  movies.splice(index, 1)
  dispatchMoviesUpdated()
}

export function getMovieById(id: number): Movie | undefined {
  return movies.find((movie) => movie.id === id)
}
