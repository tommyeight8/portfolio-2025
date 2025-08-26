"use client";

import clsx from "clsx";
import Link from "next/link";
import { toSlug } from "@/lib/slug-it";
import ProjectSkeleton from "./ProjectsSkeleton";
import { useProjectContext } from "@/context/ProjectContext";
import { useEffect, useMemo } from "react";

const categoryColorMap: Record<string, string> = {
  GRAPHIC_DESIGN: "bg-violet-400",
  FULL_STACK: "bg-blue-400",
  WEB_DESIGN: "bg-green-400",
  SHOPIFY_DEVELOPMENT: "bg-yellow-400",
  SHOPIFY_STORE_FRONT: "bg-pink-400",
};

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "GRAPHIC_DESIGN", label: "Graphic design" },
  { key: "FULL_STACK", label: "Full stack" },
  { key: "WEB_DESIGN", label: "Web design" },
  { key: "SHOPIFY_DEVELOPMENT", label: "Shopify development" },
  { key: "SHOPIFY_STORE_FRONT", label: "Shopify store front" },
] as const;

export default function ProjectList() {
  const {
    projects,
    filteredProjects,
    activeCategory,
    setActiveCategory,
    countsByCategory,
  } = useProjectContext();

  // --- Hooks must run on every render ---
  const total = useMemo(
    () => Object.values(countsByCategory).reduce((a, b) => a + b, 0),
    [countsByCategory]
  );

  const visibleFilters = useMemo(
    () =>
      FILTERS.filter(({ key }) =>
        key === "ALL" ? total > 0 : (countsByCategory as any)[key] > 0
      ),
    [countsByCategory, total]
  );

  const showFilterBar = useMemo(
    () => visibleFilters.some((f) => f.key !== "ALL"),
    [visibleFilters]
  );

  useEffect(() => {
    if (
      activeCategory !== "ALL" &&
      (countsByCategory as any)[activeCategory] === 0
    ) {
      setActiveCategory("ALL" as any);
    }
  }, [activeCategory, countsByCategory, setActiveCategory]);

  // --- Render ---
  return (
    <div className="w-full max-w-[900px] m-auto">
      {showFilterBar && (
        <div className="mb-6 flex flex-wrap gap-2">
          {visibleFilters.map(({ key, label }) => {
            const count =
              key === "ALL" ? total : (countsByCategory as any)[key] ?? 0;
            const active = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key as any)}
                aria-pressed={active}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs border transition",
                  active
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {label} {count ? `(${count})` : ""}
              </button>
            );
          })}
        </div>
      )}

      {projects.length === 0 ? (
        <ProjectSkeleton />
      ) : filteredProjects.length === 0 ? null : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              className="p-3 relative flex flex-col h-full bg-white shadow-md rounded dark:bg-[#1a1a1a]"
            >
              <Link
                href={`/projects/${toSlug(project.title)}`}
                className="block h-full"
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

                <div className="mt-auto p-2 pb-3 font-medium capitalize tracking-wide flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-white rounded-4xl text-[9px] ${
                      categoryColorMap[project.category] || "bg-gray-400"
                    }`}
                  >
                    {project.category.replace(/_/g, " ")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
