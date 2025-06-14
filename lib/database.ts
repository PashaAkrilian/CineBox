import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Grandlane10",
  database: process.env.DB_NAME || "ginebox", // Changed from GineBox to ginebox
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Create connection pool for better performance
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Remove invalid options: acquireTimeout and timeout
})

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("✅ Database connected successfully to GineBox")
    console.log(`📍 Connected to: ${dbConfig.host}:${dbConfig.port}`)
    console.log(`🗄️ Database: ${dbConfig.database}`)
    connection.release()
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    console.error("🔧 Check your MySQL server and credentials")
    return false
  }
}

// Initialize database connection on startup
export async function initializeDatabase() {
  const isConnected = await testConnection()
  if (!isConnected) {
    throw new Error("Failed to connect to database")
  }

  // Check if movies table exists
  try {
    const [rows] = await pool.execute("SHOW TABLES LIKE 'movies'")
    if ((rows as any[]).length === 0) {
      console.log("⚠️ Movies table not found. Please run the database setup script.")
    } else {
      console.log("✅ Movies table found in GineBox database")
    }
  } catch (error) {
    console.error("Error checking database structure:", error)
  }
}
