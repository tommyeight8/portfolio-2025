// app/projects/[slug]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProjectContext } from "@/context/ProjectContext";
import { toSlug } from "@/lib/slug-it";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // ← add this
import ProjectSkeleton from "@/components/ProjectSkeleton";

const categoryColorMap: Record<string, string> = {
  GRAPHIC_DESIGN: "bg-violet-400",
  FULL_STACK: "bg-blue-400",
  WEB_DESIGN: "bg-green-400",
  SHOPIFY_DEVELOPMENT: "bg-yellow-400",
  SHOPIFY_STORE_FRONT: "bg-pink-400",
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { projects } = useProjectContext();

  const project = useMemo(() => {
    if (!projects?.length) return undefined;
    return projects.find((p) => toSlug(p.title) === slug);
  }, [projects, slug]);

  // show skeleton while context is populating
  if (!projects?.length) {
    return <ProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="max-w-[1200px] mx-auto p-4">
        <h1 className="text-lg font-semibold mb-2">Project not found</h1>
        <p className="text-gray-500 mb-4">
          We couldn’t find a project with that URL.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-3 py-2 rounded-md border text-sm"
          >
            Go back
          </button>
          <Link
            href="/projects"
            className="px-3 py-2 rounded-md bg-black text-white text-sm"
          >
            All projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-[1200px] mx-auto p-4">
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to projects
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <header className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {project.title}
            </h1>
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 text-white rounded-4xl text-[11px] ${
                  categoryColorMap[project.category] || "bg-gray-400"
                }`}
              >
                {project.category.replace(/_/g, " ")}
              </span>
            </div>
          </header>

          {project.description && (
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-6 md:mb-0">
              {project.description}
            </p>
          )}
        </div>

        <div className="w-full md:w-2/3 flex">
          {project.imageUrl && (
            <div className="mb-6 overflow-hidden relative w-full min-h-[600px]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-contain object-top" // <- align to top instead of center
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
