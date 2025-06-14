import { NextResponse } from "next/server"
import { testConnection, pool } from "@/lib/database"

export async function GET() {
  try {
    console.log("🔍 Testing database connection...")

    // Test basic connection
    const isConnected = await testConnection()
    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          message: "Could not connect to GineBox database",
          troubleshooting: [
            "Check if MySQL server is running",
            "Verify database credentials in .env.local",
            "Make sure GineBox database exists",
            "Check if port 3306 is accessible",
          ],
        },
        { status: 500 },
      )
    }

    // Get database info
    const [dbInfo] = await pool.execute("SELECT DATABASE() as current_db, VERSION() as mysql_version")
    const dbData = (dbInfo as any[])[0]

    // Test movies table
    const [movieStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_movies,
        ROUND(AVG(rating), 2) as average_rating,
        MAX(rating) as highest_rating,
        MIN(rating) as lowest_rating
      FROM movies
    `)
    const stats = (movieStats as any[])[0]

    // Get sample movies
    const [sampleMovies] = await pool.execute(`
      SELECT id, title, genre, rating, year 
      FROM movies 
      ORDER BY rating DESC 
      LIMIT 5
    `)

    // Test different queries
    const [topRated] = await pool.execute("SELECT COUNT(*) as count FROM movies WHERE rating >= 8.5")
    const topRatedCount = (topRated as any[])[0].count

    const [genreStats] = await pool.execute(`
      SELECT genre, COUNT(*) as count 
      FROM movies 
      GROUP BY genre 
      ORDER BY count DESC
    `)

    return NextResponse.json({
      success: true,
      message: "✅ Database connection successful!",
      database_info: {
        name: dbData.current_db,
        mysql_version: dbData.mysql_version,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      },
      statistics: {
        total_movies: stats.total_movies,
        average_rating: stats.average_rating,
        highest_rating: stats.highest_rating,
        lowest_rating: stats.lowest_rating,
        top_rated_count: topRatedCount,
      },
      sample_movies: sampleMovies,
      genre_distribution: genreStats,
      status: "All database operations working correctly!",
    })
  } catch (error) {
    console.error("❌ Database connection test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database connection test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestions: [
          "Run the setup script in MySQL Workbench first",
          "Check your .env.local file",
          "Make sure MySQL service is running",
          "Verify database name is 'GineBox' (case sensitive)",
        ],
      },
      { status: 500 },
    )
  }
}
