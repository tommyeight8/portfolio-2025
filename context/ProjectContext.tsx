// context/ProjectContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import type { ProjectFormValues } from "@/lib/validation/project-schema";
import { reorderProjects } from "@/app/actions/reorder-projects";

interface ProjectWithId extends ProjectFormValues {
  id: string;
  position: number;
}

interface ProjectContextType {
  projects: ProjectWithId[];
  addProject: (project: ProjectWithId) => void;
  setProjects: React.Dispatch<React.SetStateAction<ProjectWithId[]>>;
  removeProjectLocally: (id: string) => void;
  editProject: (project: ProjectWithId) => void;
  projectBeingEdited: ProjectWithId | null;
  setProjectBeingEdited: React.Dispatch<
    React.SetStateAction<ProjectWithId | null>
  >;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateProjectModal: () => void; // ✅ new function
  reorderProjectLocally: (id: string, newPosition: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projectBeingEdited, setProjectBeingEdited] =
    useState<ProjectWithId | null>(null);

  const addProject = (project: ProjectWithId) => {
    setProjects((prev) => [project, ...prev]);
  };

  const removeProjectLocally = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const editProject = (project: ProjectWithId) => {
    setProjectBeingEdited(project);
  };

  const openCreateProjectModal = () => {
    setProjectBeingEdited(null);
    setIsModalOpen(true);
  };

  const reorderProjectLocally = (id: string, newPosition: number) => {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(newPosition, 0, moved);

      return updated.map((proj, idx) => ({ ...proj, position: idx }));
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        setProjects,
        removeProjectLocally,
        editProject,
        projectBeingEdited,
        setProjectBeingEdited,
        isModalOpen,
        setIsModalOpen,
        openCreateProjectModal,
        reorderProjectLocally,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
