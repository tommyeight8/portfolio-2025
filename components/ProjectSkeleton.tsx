import { Skeleton } from "@/components/ui/skeleton";

function ProjectSkeleton() {
  return (
    <article
      className="max-w-5xl mx-auto p-4 md:p-6"
      role="status"
      aria-busy="true"
      aria-label="Loading project"
    >
      {/* back link */}
      <Skeleton className="h-4 w-32 mb-6" />

      <div className="grid gap-6 md:gap-8 md:grid-cols-12">
        {/* Left: title + meta + body */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" /> {/* title */}
          </div>

          {/* description lines */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
          </div>
        </div>

        {/* Right: image */}
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-lg">
            {/* keep aspect so layout doesn't jump */}
            <Skeleton className="w-full aspect-[16/10] md:aspect-[4/3]" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectSkeleton;
