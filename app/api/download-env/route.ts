import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Template content for .env.local file
    const envTemplate = `# CineBox Database Configuration
# Copy this file to your project root as .env.local
# Make sure to restart your Next.js server after creating this file

# Database Host (usually localhost or 127.0.0.1 for local MySQL)
DB_HOST=127.0.0.1

# Database Username (default MySQL username is 'root')
DB_USER=root

# Database Password (replace with your MySQL root password)
DB_PASSWORD=Grandlane10

# Database Name (must match the database you created)
DB_NAME=GineBox

# Database Port (default MySQL port is 3306)
DB_PORT=3306

# =====================================================
# IMPORTANT INSTRUCTIONS:
# =====================================================
# 1. Save this file as '.env.local' in your project root directory
# 2. The file should be at the same level as package.json
# 3. Do NOT add quotes around the values
# 4. Do NOT add spaces around the = sign
# 5. Restart your Next.js development server after creating this file
# 6. Make sure your MySQL server is running
# 7. Verify that the GineBox database exists in MySQL
# 
# File structure should look like:
# your-project/
# ├── app/
# ├── components/
# ├── lib/
# ├── package.json
# └── .env.local  ← This file goes here!
#
# After creating this file, test your connection at:
# http://localhost:3000/test-db
# =====================================================
`

    // Create response with proper headers for file download
    const response = new NextResponse(envTemplate, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": 'attachment; filename=".env.local"',
        "Cache-Control": "no-cache",
      },
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate .env.local template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
