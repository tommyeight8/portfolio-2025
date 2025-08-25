// context/ProjectContext.tsx
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ProjectFormValues } from "@/lib/validation/project-schema";
// import { reorderProjects } from "@/app/actions/reorder-projects"; // if you use it

// If your ProjectFormValues["category"] is already a string union matching the enum,
// this re-type is optional. Otherwise define the union explicitly:
export type ProjectCategory =
  | "GRAPHIC_DESIGN"
  | "FULL_STACK"
  | "WEB_DESIGN"
  | "SHOPIFY_DEVELOPMENT"
  | "SHOPIFY_STORE_FRONT";

type CategoryFilter = "ALL" | ProjectCategory;

interface ProjectWithId extends ProjectFormValues {
  id: string;
  position: number;
}

interface ProjectContextType {
  projects: ProjectWithId[];

  /** Derived: projects after applying the active category filter */
  filteredProjects: ProjectWithId[];

  /** Current category filter */
  activeCategory: CategoryFilter;

  /** Set the current category (use "ALL" to clear) */
  setActiveCategory: (c: CategoryFilter) => void;

  /** Handy counts per category (for badges, etc.) */
  countsByCategory: Record<ProjectCategory, number>;

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
  openCreateProjectModal: () => void;
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

  // NEW: active category filter
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");

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

  // NEW: counts per category (useful for filter pills/badges)
  const countsByCategory = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      GRAPHIC_DESIGN: 0,
      FULL_STACK: 0,
      WEB_DESIGN: 0,
      SHOPIFY_DEVELOPMENT: 0,
      SHOPIFY_STORE_FRONT: 0,
    };
    for (const p of projects) counts[p.category as ProjectCategory]++;
    return counts;
  }, [projects]);

  // NEW: filtered + sorted list
  const filteredProjects = useMemo(() => {
    const base = [...projects].sort((a, b) => a.position - b.position);
    if (activeCategory === "ALL") return base;
    return base.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        filteredProjects,
        activeCategory,
        setActiveCategory,
        countsByCategory,

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
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjectContext must be used within a ProjectProvider");
  return ctx;
};
