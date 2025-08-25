// app/projects/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div
      className="w-full max-w-[900px] m-auto p-4"
      role="status"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-3 relative flex flex-col h-full bg-white shadow-md rounded dark:bg-[#1a1a1a]"
          >
            {/* Image */}
            <Skeleton className="w-full h-[216px] md:h-64 rounded" />

            {/* Text */}
            <div className="p-2 space-y-2">
              <Skeleton className="h-4 w-3/4" /> {/* title */}
              <Skeleton className="h-3 w-full" /> {/* desc line 1 */}
              <Skeleton className="h-3 w-5/6" /> {/* desc line 2 */}
              <Skeleton className="h-3 w-2/3" /> {/* desc line 3 */}
            </div>

            {/* Badge */}
            <div className="mt-auto p-2 pb-3">
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
