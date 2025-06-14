import { NextResponse } from "next/server"
import { testConnection, pool } from "@/lib/database-updated"

export async function GET() {
  try {
    console.log("🧪 Testing PHP-compatible configuration...")

    // Test connection with PHP-like config
    const isConnected = await testConnection()

    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          message: "Could not connect to ginebox database",
          php_config: {
            host: "127.0.0.1",
            user: "root",
            password: "(empty)",
            database: "ginebox",
            port: 3306,
          },
        },
        { status: 500 },
      )
    }

    // Test query like PHP
    const [rows] = await pool.execute("SELECT COUNT(*) as count FROM movies")
    const movieCount = (rows as any[])[0].count

    // Get database info
    const [dbInfo] = await pool.execute("SELECT DATABASE() as current_db, VERSION() as mysql_version")
    const currentDb = (dbInfo as any[])[0]

    // Test sample movies
    const [movies] = await pool.execute("SELECT id, title, genre, rating FROM movies LIMIT 3")

    return NextResponse.json({
      success: true,
      message: "✅ PHP-compatible configuration working!",
      connection_info: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD ? "***" : "(empty)",
        database: currentDb.current_db,
        mysql_version: currentDb.mysql_version,
        port: process.env.DB_PORT || "3306",
      },
      database_stats: {
        total_movies: movieCount,
        sample_movies: movies,
      },
      php_equivalent: {
        connection_string: `mysqli("127.0.0.1", "root", "", "ginebox", 3306)`,
        status: "This matches your PHP configuration exactly!",
      },
    })
  } catch (error) {
    console.error("❌ PHP config test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "PHP configuration test failed",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestions: [
          "Make sure MySQL is running",
          "Create 'ginebox' database (lowercase)",
          "Update .env.local with empty password",
          "Run the database setup SQL",
        ],
      },
      { status: 500 },
    )
  }
}
