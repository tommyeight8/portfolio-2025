// app/actions/get-projects.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return projects;
}
