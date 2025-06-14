import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/database"

// GET - Fetch all movies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get("filter")

    let query = "SELECT * FROM movies"
    const queryParams: any[] = []

    // Add filters
    if (filter === "popular") {
      query += " ORDER BY rating DESC LIMIT 6"
    } else if (filter === "new") {
      query += " ORDER BY year DESC LIMIT 6"
    } else if (filter === "top-rated") {
      query += " WHERE rating >= 8.5 ORDER BY rating DESC LIMIT 6"
    } else {
      query += " ORDER BY created_at DESC"
    }

    console.log("🔍 Executing query on GineBox:", query)
    const [rows] = await pool.execute(query, queryParams)
    console.log("📊 Found", (rows as any[]).length, "movies in GineBox database")

    return NextResponse.json({
      success: true,
      data: rows,
    })
  } catch (error) {
    console.error("❌ Error fetching movies from GineBox:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movies",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST - Add new movie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image_url, rating, review_user, genre, year } = body

    // Validate required fields
    if (!title || !description || !image_url || !rating || !review_user || !genre || !year) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          required: ["title", "description", "image_url", "rating", "review_user", "genre", "year"],
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

    const query = `
      INSERT INTO movies (title, description, image_url, rating, review_user, genre, year)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    console.log("➕ Adding new movie to GineBox:", title)
    const [result] = await pool.execute(query, [title, description, image_url, rating, review_user, genre, year])

    const insertResult = result as any
    const insertId = insertResult.insertId

    // Fetch the newly created movie
    const [newMovie] = await pool.execute("SELECT * FROM movies WHERE id = ?", [insertId])
    console.log("✅ Movie added successfully to GineBox with ID:", insertId)

    return NextResponse.json({
      success: true,
      data: (newMovie as any[])[0],
      message: "Movie added successfully to GineBox",
    })
  } catch (error) {
    console.error("❌ Error adding movie to GineBox:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add movie",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
