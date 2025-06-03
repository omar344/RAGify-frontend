"use client"

import type React from "react"

import { useState } from "react"
import { useProject } from "@/hooks/use-project"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const { setProjectId } = useProject()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("You are not authenticated")
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/rag/upload_file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token")
          window.location.href = "/login"
          throw new Error("Authentication expired. Please login again.")
        }
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to upload file")
      }

      const data = await response.json()
      setProjectId(data.project_id)
      router.push("/chat")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg mb-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            {file ? (
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop your file here or click to browse</p>
              </>
            )}
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.txt,.doc,.docx"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isUploading}
            >
              Select File
            </Button>
          </div>
        </div>

        <Button className="w-full" onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Upload File"}
        </Button>
      </CardContent>
    </Card>
  )
}
