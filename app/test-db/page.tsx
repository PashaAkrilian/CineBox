"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Loader2, Star, RefreshCw, Home, Settings } from "lucide-react"
import Link from "next/link"

interface DatabaseTest {
  success: boolean
  message?: string
  database_info?: {
    name: string
    mysql_version: string
    host: string
    port: string
  }
  statistics?: {
    total_movies: number
    average_rating: number
    highest_rating: number
    lowest_rating: number
    top_rated_count: number
  }
  sample_movies?: Array<{
    id: number
    title: string
    genre: string
    rating: number
    year: number
  }>
  genre_distribution?: Array<{
    genre: string
    count: number
  }>
  error?: string
  details?: string
  suggestions?: string[]
}

export default function TestDatabasePage() {
  const [testResult, setTestResult] = useState<DatabaseTest | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastTestTime, setLastTestTime] = useState<string>("")

  const runTest = async () => {
    setLoading(true)
    setLastTestTime(new Date().toLocaleTimeString())

    try {
      console.log("🔍 Starting database connection test...")
      const response = await fetch("/api/test-connection")
      const result = await response.json()

      console.log("📊 Test result:", result)
      setTestResult(result)

      if (result.success) {
        console.log("✅ Database test successful!")
      } else {
        console.log("❌ Database test failed:", result.error)
      }
    } catch (error) {
      console.error("🚨 API connection failed:", error)
      setTestResult({
        success: false,
        error: "Failed to connect to API endpoint",
        details: error instanceof Error ? error.message : "Unknown error",
        suggestions: [
          "Make sure Next.js server is running (npm run dev)",
          "Check if port 3000 is accessible",
          "Verify API route exists at /api/test-connection",
          "Check browser console for more details",
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  // Auto-run test on page load
  useEffect(() => {
    runTest()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🗄️ Database Connection Test</h1>
          <p className="text-gray-600">Testing connection to GineBox MySQL database</p>
          {lastTestTime && <p className="text-sm text-gray-500 mt-2">Last tested: {lastTestTime}</p>}
        </div>

        <div className="space-y-6">
          {/* Connection Status Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6" />
                Connection Status
                <Button
                  onClick={runTest}
                  disabled={loading}
                  size="sm"
                  className="ml-auto"
                  variant={testResult?.success ? "outline" : "default"}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Run Test
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-3 text-gray-600 py-4">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <div>
                    <div className="font-medium">Testing database connection...</div>
                    <div className="text-sm text-gray-500">This may take a few seconds</div>
                  </div>
                </div>
              ) : testResult ? (
                <div className="space-y-4">
                  {/* Status Message */}
                  <div
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {testResult.success ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <div className={`font-semibold ${testResult.success ? "text-green-800" : "text-red-800"}`}>
                        {testResult.message || testResult.error}
                      </div>
                      {testResult.details && (
                        <div className={`text-sm mt-1 ${testResult.success ? "text-green-600" : "text-red-600"}`}>
                          {testResult.details}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Database Info - Success */}
                  {testResult.success && testResult.database_info && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Database Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <strong className="text-blue-700">Database:</strong>
                          <span className="text-blue-600">{testResult.database_info.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <strong className="text-blue-700">MySQL Version:</strong>
                          <span className="text-blue-600">{testResult.database_info.mysql_version}</span>
                        </div>
                        <div className="flex justify-between">
                          <strong className="text-blue-700">Host:</strong>
                          <span className="text-blue-600">{testResult.database_info.host}</span>
                        </div>
                        <div className="flex justify-between">
                          <strong className="text-blue-700">Port:</strong>
                          <span className="text-blue-600">{testResult.database_info.port}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Suggestions */}
                  {!testResult.success && testResult.suggestions && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="font-semibold text-yellow-800 mb-3">🔧 Troubleshooting Suggestions:</h3>
                      <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                        {testResult.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Click "Run Test" to check database connection</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Statistics */}
          {testResult?.success && testResult.statistics && (
            <Card>
              <CardHeader>
                <CardTitle>📊 Database Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">{testResult.statistics.total_movies}</div>
                    <div className="text-sm text-blue-800 font-medium">Total Movies</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">{testResult.statistics.average_rating}</div>
                    <div className="text-sm text-green-800 font-medium">Avg Rating</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl font-bold text-yellow-600">{testResult.statistics.highest_rating}</div>
                    <div className="text-sm text-yellow-800 font-medium">Highest</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-3xl font-bold text-red-600">{testResult.statistics.lowest_rating}</div>
                    <div className="text-sm text-red-800 font-medium">Lowest</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600">{testResult.statistics.top_rated_count}</div>
                    <div className="text-sm text-purple-800 font-medium">Top Rated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sample Movies */}
          {testResult?.success && testResult.sample_movies && (
            <Card>
              <CardHeader>
                <CardTitle>🎬 Sample Movies from Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testResult.sample_movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{movie.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {movie.genre}
                          </Badge>
                          <span className="text-gray-500">•</span>
                          <span>{movie.year}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-500">ID: {movie.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-yellow-700">{movie.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Genre Distribution */}
          {testResult?.success && testResult.genre_distribution && (
            <Card>
              <CardHeader>
                <CardTitle>🎭 Genre Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {testResult.genre_distribution.map((item) => (
                    <div
                      key={item.genre}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <span className="font-medium">{item.genre}</span>
                      <Badge variant="outline" className="font-semibold">
                        {item.count} {item.count === 1 ? "movie" : "movies"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home Page
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/movies">
                    <Database className="w-4 h-4 mr-2" />
                    Manage Movies
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/api/movies" target="_blank" rel="noreferrer">
                    📡 View API Response
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/api/test-connection" target="_blank" rel="noreferrer">
                    🔍 Raw Test Data
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
