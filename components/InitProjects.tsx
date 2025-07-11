// components/InitProjects.tsx
"use client";

import { useEffect } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { getProjects } from "@/app/actions/get-projects";
import type { ProjectWithId } from "@/lib/validation/project-schema";

export function InitProjects() {
  const { setProjects } = useProjectContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const res: ProjectWithId[] = await getProjects();
      setProjects(res);
    };

    fetchProjects();
  }, [setProjects]);

  return null;
}
