import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ginebox",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
}

// Create connection pool with minimal config
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
})

// Test database connection with better error handling
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("✅ Database connected successfully")
    connection.release()
    return true
  } catch (error) {
    console.log("⚠️ Database not connected (this is OK for development)")
    console.log("💡 App will work with mock data")
    return false
  }
}

// Initialize database - non-blocking
export async function initializeDatabase() {
  try {
    await testConnection()
  } catch (error) {
    // Silently fail - app will work without database
    console.log("🔧 Running in development mode without database")
  }
}
