"use client"

import type React from "react"

import { createContext, useState } from "react"

interface ProjectContextType {
  projectId: string | null
  setProjectId: (id: string) => void
  clearProject: () => void
}

export const ProjectContext = createContext<ProjectContextType>({
  projectId: null,
  setProjectId: () => {},
  clearProject: () => {},
})

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projectId, setProjectIdState] = useState<string | null>(null)

  const setProjectId = (id: string) => {
    setProjectIdState(id)
    localStorage.setItem("project_id", id)
  }

  const clearProject = () => {
    setProjectIdState(null)
    localStorage.removeItem("project_id")
  }

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        setProjectId,
        clearProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
