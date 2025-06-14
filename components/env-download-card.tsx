"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, CheckCircle, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EnvDownloadCard() {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const downloadEnvTemplate = async () => {
    setDownloading(true)
    try {
      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = "/api/download-env"
      link.download = ".env.local"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Download className="w-6 h-6" />
          Download .env.local Template
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            Get a ready-to-use .env.local template file with all the correct settings and detailed instructions.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>Pre-configured with your MySQL credentials</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>Includes detailed setup instructions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span>Ready to place in your project root</span>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={downloadEnvTemplate}
            disabled={downloading}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {downloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Preparing Download...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Downloaded Successfully!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download .env.local Template
              </>
            )}
          </Button>
        </div>

        {downloaded && (
          <Alert className="border-green-300 bg-green-100">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>File downloaded!</strong> Now place the .env.local file in your project root directory and restart
              your Next.js server.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-green-600 bg-green-100 p-3 rounded border border-green-200">
          <strong>Next Steps:</strong>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Save the downloaded file as .env.local in your project root</li>
            <li>Restart your Next.js server (Ctrl+C then npm run dev)</li>
            <li>Test the connection at /test-db</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
