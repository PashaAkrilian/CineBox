// Debug MySQL Connection Issues
console.log("🔍 Starting MySQL Connection Debug...\n")

// Check if mysql2 is available
try {
  const mysql = require("mysql2/promise")
  console.log("✅ mysql2 package is available")
} catch (error) {
  console.log("❌ mysql2 package not found:", error.message)
  console.log("💡 Try running: npm install mysql2")
  process.exit(1)
}

// Test different connection configurations
const mysql = require("mysql2/promise")

const connectionConfigs = [
  {
    name: "Config 1 - Standard localhost",
    config: {
      host: "localhost",
      user: "root",
      password: "Grandlane10",
      database: "GineBox",
      port: 3306,
    },
  },
  {
    name: "Config 2 - 127.0.0.1",
    config: {
      host: "127.0.0.1",
      user: "root",
      password: "Grandlane10",
      database: "GineBox",
      port: 3306,
    },
  },
  {
    name: "Config 3 - Without database (test MySQL server)",
    config: {
      host: "localhost",
      user: "root",
      password: "Grandlane10",
      port: 3306,
    },
  },
  {
    name: "Config 4 - Empty password",
    config: {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
    },
  },
]

async function testConnection(name, config) {
  console.log(`\n🧪 Testing: ${name}`)
  console.log(`   Host: ${config.host}:${config.port}`)
  console.log(`   User: ${config.user}`)
  console.log(`   Password: ${config.password ? "***" : "(empty)"}`)
  console.log(`   Database: ${config.database || "(none)"}`)

  try {
    const connection = await mysql.createConnection(config)
    console.log("✅ Connection successful!")

    // Test basic query
    const [rows] = await connection.execute("SELECT VERSION() as version, NOW() as current_time")
    console.log(`   MySQL Version: ${rows[0].version}`)
    console.log(`   Current Time: ${rows[0].current_time}`)

    // Check if GineBox database exists
    if (!config.database) {
      const [databases] = await connection.execute("SHOW DATABASES")
      const dbNames = databases.map((db) => db.Database)
      console.log(`   Available Databases: ${dbNames.join(", ")}`)

      if (dbNames.includes("GineBox")) {
        console.log("✅ GineBox database found!")
      } else {
        console.log("❌ GineBox database not found!")
        console.log("💡 You may need to create the database first")
      }
    } else {
      // Test table access
      try {
        const [tables] = await connection.execute("SHOW TABLES")
        console.log(`   Tables in ${config.database}: ${tables.map((t) => Object.values(t)[0]).join(", ")}`)

        if (tables.some((t) => Object.values(t)[0] === "movies")) {
          const [movieCount] = await connection.execute("SELECT COUNT(*) as count FROM movies")
          console.log(`   Movies in database: ${movieCount[0].count}`)
        }
      } catch (dbError) {
        console.log(`❌ Database access error: ${dbError.message}`)
      }
    }

    await connection.end()
    return true
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`)
    console.log(`   Error Code: ${error.code}`)
    console.log(`   SQL State: ${error.sqlState || "N/A"}`)

    // Provide specific troubleshooting
    if (error.code === "ECONNREFUSED") {
      console.log("💡 MySQL server is not running or not accessible")
      console.log("   - Check if MySQL service is started")
      console.log("   - Verify port 3306 is not blocked")
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("💡 Authentication failed")
      console.log("   - Check username and password")
      console.log("   - Verify user has proper permissions")
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.log("💡 Database doesn't exist")
      console.log("   - Create GineBox database first")
    }

    return false
  }
}

async function runDiagnostics() {
  console.log("=".repeat(60))
  console.log("🏥 MySQL Connection Diagnostics")
  console.log("=".repeat(60))

  let successfulConnections = 0

  for (const { name, config } of connectionConfigs) {
    const success = await testConnection(name, config)
    if (success) successfulConnections++

    // Wait a bit between tests
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log("\n" + "=".repeat(60))
  console.log("📊 DIAGNOSIS SUMMARY")
  console.log("=".repeat(60))
  console.log(`Successful connections: ${successfulConnections}/${connectionConfigs.length}`)

  if (successfulConnections === 0) {
    console.log("\n❌ NO CONNECTIONS SUCCESSFUL")
    console.log("\n🔧 TROUBLESHOOTING STEPS:")
    console.log("1. Check if MySQL is installed and running")
    console.log("2. Verify MySQL service status")
    console.log("3. Check if port 3306 is available")
    console.log("4. Verify root password")
    console.log("5. Try connecting with MySQL Workbench first")

    console.log("\n💻 COMMON SOLUTIONS:")
    console.log("Windows: Start MySQL service in Services.msc")
    console.log("Mac: brew services start mysql")
    console.log("Linux: sudo systemctl start mysql")
  } else if (successfulConnections < connectionConfigs.length) {
    console.log("\n⚠️ PARTIAL SUCCESS")
    console.log("Some connections work, check the successful config above")
  } else {
    console.log("\n✅ ALL CONNECTIONS SUCCESSFUL")
    console.log("MySQL server is running and accessible!")
  }

  console.log("\n🎯 NEXT STEPS:")
  console.log("1. If MySQL is not running, start the service")
  console.log("2. Create GineBox database if it doesn't exist")
  console.log("3. Update your .env.local with working configuration")
  console.log("4. Test the Next.js app connection")
}

// Run the diagnostics
runDiagnostics().catch(console.error)
