"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useProject } from "@/hooks/use-project"
import { DashboardHeader } from "@/components/dashboard-header"
import { FileUploader } from "@/components/file-uploader"
import { ChatInterface } from "@/components/chat-interface"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const { projectId } = useProject()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-background border-b">
        <DashboardHeader />
      </div>
      {/* Main content with padding to avoid header overlap */}
      <main className="flex-1 container py-6 pt-16">
        {!projectId ? (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Please upload a file to start chatting</h1>
              <p className="text-muted-foreground">supported files are: .pdf</p>
            </div>
            <FileUploader />
          </div>
        ) : (
          <ChatInterface />
        )}
      </main>
    </div>
  )
}
