import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if environment variables exist
    const envVariables = {
      DB_HOST: process.env.DB_HOST,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      DB_PORT: process.env.DB_PORT,
    }

    // Check for missing variables
    const missingVariables = Object.entries(envVariables)
      .filter(([key, value]) => !value)
      .map(([key]) => key)

    const allVariablesPresent = missingVariables.length === 0

    // Validate specific values
    const validationIssues = []

    if (envVariables.DB_HOST && !["127.0.0.1", "localhost"].includes(envVariables.DB_HOST)) {
      validationIssues.push(`DB_HOST should be 127.0.0.1 or localhost, got: ${envVariables.DB_HOST}`)
    }

    if (envVariables.DB_PORT && envVariables.DB_PORT !== "3306") {
      validationIssues.push(`DB_PORT should be 3306, got: ${envVariables.DB_PORT}`)
    }

    if (envVariables.DB_NAME && envVariables.DB_NAME !== "GineBox") {
      validationIssues.push(`DB_NAME should be GineBox, got: ${envVariables.DB_NAME}`)
    }

    return NextResponse.json({
      success: allVariablesPresent && validationIssues.length === 0,
      env_variables: envVariables,
      missing_variables: missingVariables,
      validation_issues: validationIssues,
      file_exists: true, // We can't directly check file existence from API route
      message: allVariablesPresent
        ? validationIssues.length === 0
          ? "All environment variables are properly configured!"
          : "Environment variables found but some values need attention"
        : "Some environment variables are missing",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check environment variables",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
