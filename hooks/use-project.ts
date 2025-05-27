"use client"

import { useContext, useEffect } from "react"
import { ProjectContext } from "@/components/project-provider"

export function useProject() {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider")
  }

  // Check localStorage for project_id on mount
  useEffect(() => {
    const storedProjectId = localStorage.getItem("project_id")
    if (storedProjectId && !context.projectId) {
      context.setProjectId(storedProjectId)
    }
  }, [context])

  return context
}
