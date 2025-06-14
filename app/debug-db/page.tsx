"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, AlertTriangle, CheckCircle, XCircle, Settings, Play, RefreshCw, Terminal } from "lucide-react"

interface DiagnosticResult {
  success: boolean
  message?: string
  details?: any
  suggestions?: string[]
  error?: string
}

export default function DebugDatabasePage() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-connection")
      const result = await response.json()
      setDiagnostics(result)
    } catch (error) {
      setDiagnostics({
        success: false,
        error: "Failed to run diagnostics",
        suggestions: [
          "Check if Next.js server is running",
          "Verify API endpoint exists",
          "Check browser console for errors",
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🔧 Database Connection Debug</h1>
          <p className="text-gray-600">Comprehensive MySQL connection diagnostics</p>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-6 h-6" />
                Debug Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button onClick={runDiagnostics} disabled={loading} size="lg">
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      Running Diagnostics...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Full Diagnostics
                    </>
                  )}
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="/test-db">🧪 Simple Connection Test</a>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="/check-env">📋 Check Environment</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues & Solutions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                Common Connection Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">❌ MySQL Not Running</h3>
                  <p className="text-sm text-red-700 mb-3">Most common issue - MySQL service is stopped</p>
                  <div className="text-xs text-red-600 space-y-1">
                    <div>
                      <strong>Windows:</strong> Services.msc → Start MySQL
                    </div>
                    <div>
                      <strong>Mac:</strong> brew services start mysql
                    </div>
                    <div>
                      <strong>Linux:</strong> sudo systemctl start mysql
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">🔐 Wrong Password</h3>
                  <p className="text-sm text-yellow-700 mb-3">Authentication failed with current credentials</p>
                  <div className="text-xs text-yellow-600 space-y-1">
                    <div>• Check MySQL root password</div>
                    <div>• Try empty password: ''</div>
                    <div>• Reset MySQL password if needed</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">🗄️ Database Missing</h3>
                  <p className="text-sm text-blue-700 mb-3">GineBox database doesn't exist</p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <div>• Run database creation script</div>
                    <div>• Use MySQL Workbench</div>
                    <div>• Check database name spelling</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">🔌 Port Issues</h3>
                  <p className="text-sm text-purple-700 mb-3">Port 3306 blocked or MySQL on different port</p>
                  <div className="text-xs text-purple-600 space-y-1">
                    <div>• Check firewall settings</div>
                    <div>• Verify MySQL port configuration</div>
                    <div>• Try different port numbers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnostic Results */}
          {diagnostics && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6" />
                  Diagnostic Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${
                    diagnostics.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  {diagnostics.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <div>
                    <div className={`font-semibold ${diagnostics.success ? "text-green-800" : "text-red-800"}`}>
                      {diagnostics.message || diagnostics.error}
                    </div>
                  </div>
                </div>

                {diagnostics.details && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2">📊 Connection Details:</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(diagnostics.details, null, 2)}
                    </pre>
                  </div>
                )}

                {diagnostics.suggestions && diagnostics.suggestions.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3">💡 Suggested Solutions:</h3>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                      {diagnostics.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Manual Connection Test */}
          <Card>
            <CardHeader>
              <CardTitle>🧪 Manual Connection Test</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <Settings className="h-4 w-4" />
                <AlertDescription>Try connecting to MySQL manually to isolate the issue</AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="p-3 bg-gray-100 rounded font-mono text-sm">
                  <strong>MySQL Command Line:</strong>
                  <br />
                  mysql -u root -p -h 127.0.0.1 -P 3306
                </div>

                <div className="p-3 bg-gray-100 rounded font-mono text-sm">
                  <strong>Test Database Exists:</strong>
                  <br />
                  SHOW DATABASES;
                  <br />
                  USE GineBox;
                  <br />
                  SHOW TABLES;
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Check */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Current Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Expected Configuration:</h3>
                  <div className="bg-green-50 p-3 rounded border border-green-200 font-mono text-sm">
                    DB_HOST=127.0.0.1
                    <br />
                    DB_USER=root
                    <br />
                    DB_PASSWORD=Grandlane10
                    <br />
                    DB_NAME=GineBox
                    <br />
                    DB_PORT=3306
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">File Location:</h3>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                    <div className="font-mono">project-root/.env.local</div>
                    <div className="text-gray-600 mt-2">File must be in the same directory as package.json</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
