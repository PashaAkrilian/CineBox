import { NextResponse } from "next/server"
import { testConnection, pool } from "@/lib/database"

export async function GET() {
  try {
    // Test connection
    const isConnected = await testConnection()

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          message: "Could not connect to GineBox database",
        },
        { status: 500 },
      )
    }

    // Test query
    const [rows] = await pool.execute("SELECT COUNT(*) as count FROM movies")
    const movieCount = (rows as any[])[0].count

    // Get database info
    const [dbInfo] = await pool.execute("SELECT DATABASE() as current_db")
    const currentDb = (dbInfo as any[])[0].current_db

    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      data: {
        host: process.env.DB_HOST,
        database: currentDb,
        movieCount: movieCount,
        status: "Connected to GineBox database",
      },
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestion: "Make sure MySQL is running and GineBox database exists",
      },
      { status: 500 },
    )
  }
}
