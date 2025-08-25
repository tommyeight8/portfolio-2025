"use client";

import { useProjectContext } from "@/context/ProjectContext";
import { toSlug } from "@/lib/slug-it";
import Link from "next/link";
import slugify from "slugify";
import ProjectSkeleton from "./ProjectsSkeleton";

const categoryColorMap: Record<string, string> = {
  GRAPHIC_DESIGN: "bg-violet-400",
  FULL_STACK: "bg-blue-400",
  WEB_DESIGN: "bg-green-400",
  SHOPIFY_DEVELOPMENT: "bg-yellow-400",
  SHOPIFY_STORE_FRONT: "bg-pink-400",
};

export default function ProjectList() {
  const { projects } = useProjectContext();

  if (projects.length === 0) {
    return <ProjectSkeleton />;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[900px] m-auto">
      {projects.map((project) => (
        <Link href={`/projects/${toSlug(project.title)}`} key={project.id}>
          <li
            className="p-3 relative flex flex-col h-full bg-white shadow-md rounded
            dark:bg-[#1a1a1a]"
          >
            <div className="h-54 md:h-64 overflow-hidden">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                {project.title}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300 line-clamp-3 text-xs">
                {project.description}
              </p>
            </div>

            <div className="mt-auto p-2 pb-3 font-medium text-muted/50 capitalize tracking-wide flex justify-between items-center">
              <span
                className={`px-3 py-1 text-white rounded-4xl text-[9px] ${
                  categoryColorMap[project.category] || "bg-gray-400"
                }`}
              >
                {project.category.replace(/_/g, " ")}
              </span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
