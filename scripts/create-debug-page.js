console.log("🛠️ CREATING DEBUG PAGE CODE")
console.log("=".repeat(50))

console.log("\n📄 Add this to app/debug/page.tsx to check environment:")
console.log("-".repeat(50))

const debugPageCode = `"use client"

import { useEffect, useState } from "react"

export default function DebugPage() {
  const [envVars, setEnvVars] = useState(null)
  const [connectionTest, setConnectionTest] = useState(null)

  useEffect(() => {
    // Test environment variables
    fetch('/api/debug-env')
      .then(res => res.json())
      .then(data => setEnvVars(data))
      .catch(err => console.error('Env test failed:', err))

    // Test database connection
    fetch('/api/test-connection')
      .then(res => res.json())
      .then(data => setConnectionTest(data))
      .catch(err => console.error('Connection test failed:', err))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔍 Debug Information</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Test:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(connectionTest, null, 2)}
        </pre>
      </div>
    </div>
  )
}`

console.log(debugPageCode)
console.log("-".repeat(50))

console.log("\n📄 Add this to app/api/debug-env/route.ts:")
console.log("-".repeat(50))

const debugApiCode = `import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    env_check: {
      DB_HOST: process.env.DB_HOST || 'MISSING',
      DB_USER: process.env.DB_USER || 'MISSING', 
      DB_PASSWORD: process.env.DB_PASSWORD === '' ? 'EMPTY (correct)' : process.env.DB_PASSWORD || 'MISSING',
      DB_NAME: process.env.DB_NAME || 'MISSING',
      DB_PORT: process.env.DB_PORT || 'MISSING',
    },
    file_check: {
      node_env: process.env.NODE_ENV,
      all_env_keys: Object.keys(process.env).filter(key => key.startsWith('DB_')),
    },
    status: 'Environment variables loaded'
  })
}`

console.log(debugApiCode)
console.log("-".repeat(50))

console.log("\n🎯 HOW TO USE DEBUG PAGE:")
console.log("1. Create the files above")
console.log("2. Go to: http://localhost:3000/debug")
console.log("3. Check if environment variables are loaded")
console.log("4. If variables show 'MISSING', .env.local is not loaded")

console.log("\n🔍 WHAT TO LOOK FOR:")
console.log("✅ Good result:")
console.log("   DB_HOST: '127.0.0.1'")
console.log("   DB_USER: 'root'")
console.log("   DB_PASSWORD: 'EMPTY (correct)'")
console.log("   DB_NAME: 'ginebox'")
console.log("   DB_PORT: '3306'")

console.log("\n❌ Bad result:")
console.log("   DB_HOST: 'MISSING'")
console.log("   DB_USER: 'MISSING'")
console.log("   etc...")

console.log("\nIf you see 'MISSING' = .env.local file not loaded correctly!")
