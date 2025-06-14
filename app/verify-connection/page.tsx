"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Database, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"

interface ConnectionTest {
  success: boolean
  message?: string
  database_info?: any
  error?: string
}

export default function VerifyConnectionPage() {
  const [testResult, setTestResult] = useState<ConnectionTest | null>(null)
  const [loading, setLoading] = useState(false)

  const runConnectionTest = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-connection")
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Failed to test connection",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runConnectionTest()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🔗 Verify Database Connection</h1>
          <p className="text-gray-600">Testing connection to your ginebox database</p>
        </div>

        <div className="space-y-6">
          {/* MySQL Workbench Status */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-6 h-6" />
                MySQL Workbench Status: ✅ WORKING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Image
                  src="/images/mysql-workbench.png"
                  alt="MySQL Workbench Screenshot"
                  width={800}
                  height={400}
                  className="rounded-lg border shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <strong className="text-green-700">Database:</strong>
                  <span className="text-green-600">ginebox ✅</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-green-700">Table:</strong>
                  <span className="text-green-600">movies ✅</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-green-700">Connection:</strong>
                  <span className="text-green-600">Active ✅</span>
                </div>
                <div className="flex justify-between">
                  <strong className="text-green-700">Queries:</strong>
                  <span className="text-green-600">Working ✅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CineBox Connection Test */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6" />
                CineBox Connection Test
                <Button onClick={runConnectionTest} disabled={loading} size="sm" className="ml-auto">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Testing...
                    </>
                  ) : (
                    "Test Again"
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-3 text-gray-600 py-4">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <div>Testing connection to ginebox database...</div>
                </div>
              ) : testResult ? (
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <div>
                    <div className={`font-semibold ${testResult.success ? "text-green-800" : "text-red-800"}`}>
                      {testResult.message || testResult.error}
                    </div>
                    {testResult.database_info && (
                      <div className="text-sm text-green-600 mt-1">Connected to: {testResult.database_info.name}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Database className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Click "Test Again" to check connection</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuration Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-500" />
                Configuration Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">📄 Create .env.local file:</h3>
                  <div className="bg-white p-3 rounded border font-mono text-sm">
                    DB_HOST=127.0.0.1
                    <br />
                    DB_USER=root
                    <br />
                    DB_PASSWORD=
                    <br />
                    DB_NAME=ginebox
                    <br />
                    DB_PORT=3306
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">🔧 Next Steps:</h3>
                  <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                    <li>Create .env.local in your project root</li>
                    <li>Install mysql2: npm install mysql2</li>
                    <li>Restart Next.js server: npm run dev</li>
                    <li>Test connection again</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
