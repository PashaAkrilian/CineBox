import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🔍 Starting comprehensive database debug...")

    // Check environment variables
    const envVars = {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT,
    }

    console.log("📋 Environment variables:", {
      ...envVars,
      DB_PASSWORD: envVars.DB_PASSWORD ? "***" : undefined,
    })

    // Check if mysql2 is available
    let mysql
    try {
      mysql = require("mysql2/promise")
      console.log("✅ mysql2 package available")
    } catch (error) {
      console.log("❌ mysql2 package not found")
      return NextResponse.json({
        success: false,
        error: "mysql2 package not installed",
        suggestions: [
          "Run: npm install mysql2",
          "Check package.json dependencies",
          "Restart Next.js server after installing",
        ],
      })
    }

    // Test different connection configurations
    const testConfigs = [
      {
        name: "Current Environment Config",
        config: {
          host: envVars.DB_HOST || "127.0.0.1",
          user: envVars.DB_USER || "root",
          password: envVars.DB_PASSWORD || "Grandlane10",
          database: envVars.DB_NAME || "GineBox",
          port: Number.parseInt(envVars.DB_PORT || "3306"),
        },
      },
      {
        name: "Without Database (Server Only)",
        config: {
          host: envVars.DB_HOST || "127.0.0.1",
          user: envVars.DB_USER || "root",
          password: envVars.DB_PASSWORD || "Grandlane10",
          port: Number.parseInt(envVars.DB_PORT || "3306"),
        },
      },
      {
        name: "Empty Password Test",
        config: {
          host: envVars.DB_HOST || "127.0.0.1",
          user: envVars.DB_USER || "root",
          password: "",
          port: Number.parseInt(envVars.DB_PORT || "3306"),
        },
      },
    ]

    const results = []
    let successfulConnection = null

    for (const { name, config } of testConfigs) {
      console.log(`🧪 Testing: ${name}`)

      try {
        const connection = await mysql.createConnection({
          ...config,
          connectTimeout: 5000,
          acquireTimeout: 5000,
        })

        console.log(`✅ ${name} - Connection successful`)

        // Test basic query
        const [versionResult] = await connection.execute("SELECT VERSION() as version, NOW() as current_time")
        const version = versionResult[0]

        let databaseInfo = null
        let tableInfo = null

        // Check databases
        if (!config.database) {
          const [databases] = await connection.execute("SHOW DATABASES")
          const dbNames = databases.map((db: any) => db.Database)
          databaseInfo = {
            available_databases: dbNames,
            ginebox_exists: dbNames.includes("GineBox"),
          }
        } else {
          try {
            const [tables] = await connection.execute("SHOW TABLES")
            const tableNames = tables.map((t: any) => Object.values(t)[0])
            tableInfo = {
              tables: tableNames,
              movies_table_exists: tableNames.includes("movies"),
            }

            if (tableNames.includes("movies")) {
              const [movieCount] = await connection.execute("SELECT COUNT(*) as count FROM movies")
              tableInfo.movie_count = movieCount[0].count
            }
          } catch (dbError) {
            console.log(`⚠️ Database access error: ${dbError.message}`)
          }
        }

        await connection.end()

        const result = {
          name,
          success: true,
          config: { ...config, password: config.password ? "***" : "" },
          mysql_version: version.version,
          current_time: version.current_time,
          database_info: databaseInfo,
          table_info: tableInfo,
        }

        results.push(result)

        if (!successfulConnection) {
          successfulConnection = result
        }
      } catch (error: any) {
        console.log(`❌ ${name} - Failed: ${error.message}`)

        results.push({
          name,
          success: false,
          config: { ...config, password: config.password ? "***" : "" },
          error: error.message,
          error_code: error.code,
          sql_state: error.sqlState,
        })
      }
    }

    // Generate suggestions based on results
    const suggestions = []

    if (!successfulConnection) {
      suggestions.push("MySQL server is not running or not accessible")
      suggestions.push("Check if MySQL service is started on your system")
      suggestions.push("Verify port 3306 is not blocked by firewall")
      suggestions.push("Try connecting with MySQL Workbench first")

      const hasAuthError = results.some((r) => r.error_code === "ER_ACCESS_DENIED_ERROR")
      if (hasAuthError) {
        suggestions.push("Check MySQL root password - try empty password or reset it")
      }

      const hasConnRefused = results.some((r) => r.error_code === "ECONNREFUSED")
      if (hasConnRefused) {
        suggestions.push("MySQL server is not running - start MySQL service")
      }
    } else {
      if (successfulConnection.database_info && !successfulConnection.database_info.ginebox_exists) {
        suggestions.push("GineBox database doesn't exist - run the database creation script")
      }

      if (successfulConnection.table_info && !successfulConnection.table_info.movies_table_exists) {
        suggestions.push("Movies table doesn't exist - run the table creation script")
      }
    }

    return NextResponse.json({
      success: !!successfulConnection,
      message: successfulConnection
        ? `Connection successful with: ${successfulConnection.name}`
        : "All connection attempts failed",
      details: {
        environment_variables: { ...envVars, DB_PASSWORD: envVars.DB_PASSWORD ? "***" : undefined },
        test_results: results,
        successful_config: successfulConnection?.config,
        mysql_info: successfulConnection
          ? {
              version: successfulConnection.mysql_version,
              time: successfulConnection.current_time,
            }
          : null,
      },
      suggestions,
    })
  } catch (error) {
    console.error("❌ Debug process failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Debug process failed",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestions: [
          "Check if Next.js server is running properly",
          "Verify mysql2 package is installed",
          "Check server logs for more details",
        ],
      },
      { status: 500 },
    )
  }
}
