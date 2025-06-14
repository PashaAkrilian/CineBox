import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Grandlane10",
  database: process.env.DB_NAME || "ginebox",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Create connection pool - MUST connect to database
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test database connection - REQUIRED
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("✅ Database connected successfully to MySQL")
    console.log(`📍 Connected to: ${dbConfig.host}:${dbConfig.port}`)
    console.log(`🗄️ Database: ${dbConfig.database}`)
    connection.release()
    return true
  } catch (error) {
    console.error("❌ Database connection FAILED:", error)
    throw new Error("Database connection required for this app")
  }
}

// Initialize database - MUST succeed
export async function initializeDatabase() {
  const isConnected = await testConnection()
  if (!isConnected) {
    throw new Error("Failed to connect to database")
  }

  // Ensure movies table exists
  try {
    const [rows] = await pool.execute("SHOW TABLES LIKE 'movies'")
    if ((rows as any[]).length === 0) {
      console.log("⚠️ Movies table not found. Please run database setup.")
      throw new Error("Movies table not found")
    } else {
      console.log("✅ Movies table found and ready")
    }
  } catch (error) {
    console.error("Error checking database structure:", error)
    throw error
  }
}
