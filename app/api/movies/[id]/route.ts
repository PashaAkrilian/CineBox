import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/database"

// PUT - Update movie
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { title, description, image_url, rating, review_user, genre, year } = body

    // Validate required fields
    if (!title || !description || !image_url || !rating || !review_user || !genre || !year) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate rating range
    if (rating < 1 || rating > 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 10",
        },
        { status: 400 },
      )
    }

    // Check if movie exists
    const [existingMovie] = await pool.execute("SELECT id FROM movies WHERE id = ?", [id])
    if ((existingMovie as any[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found in GineBox database",
        },
        { status: 404 },
      )
    }

    const query = `
      UPDATE movies 
      SET title = ?, description = ?, image_url = ?, rating = ?, 
          review_user = ?, genre = ?, year = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `

    console.log("✏️ Updating movie ID in GineBox:", id)
    await pool.execute(query, [title, description, image_url, rating, review_user, genre, year, id])

    // Fetch updated movie
    const [updatedMovie] = await pool.execute("SELECT * FROM movies WHERE id = ?", [id])
    console.log("✅ Movie updated successfully in GineBox")

    return NextResponse.json({
      success: true,
      data: (updatedMovie as any[])[0],
      message: "Movie updated successfully in GineBox",
    })
  } catch (error) {
    console.error("❌ Error updating movie in GineBox:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update movie",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// DELETE - Delete movie
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Check if movie exists
    const [existingMovie] = await pool.execute("SELECT id, title FROM movies WHERE id = ?", [id])
    if ((existingMovie as any[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found in GineBox database",
        },
        { status: 404 },
      )
    }

    const movieTitle = (existingMovie as any[])[0].title
    console.log("🗑️ Deleting movie from GineBox:", movieTitle)

    await pool.execute("DELETE FROM movies WHERE id = ?", [id])
    console.log("✅ Movie deleted successfully from GineBox")

    return NextResponse.json({
      success: true,
      message: `Movie "${movieTitle}" deleted successfully from GineBox`,
    })
  } catch (error) {
    console.error("❌ Error deleting movie from GineBox:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete movie",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET - Get single movie
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const [movie] = await pool.execute("SELECT * FROM movies WHERE id = ?", [id])

    if ((movie as any[]).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found in GineBox database",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: (movie as any[])[0],
    })
  } catch (error) {
    console.error("❌ Error fetching movie from GineBox:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movie",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
