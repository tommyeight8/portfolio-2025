"use server";

import { prisma } from "@/lib/prisma";
import {
  projectSchema,
  ProjectFormValues,
} from "@/lib/validation/project-schema";

export async function createProject(formData: ProjectFormValues) {
  const validated = projectSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid form data");
  }

  // ✅ Get the current max position
  const max = await prisma.project.aggregate({
    _max: { position: true },
  });

  const nextPosition = (max._max.position ?? -1) + 1;

  const project = await prisma.project.create({
    data: {
      ...validated.data,
      position: nextPosition, // ✅ assign sequential position
    },
  });

  return project;
}

// export async function createProject(formData: ProjectFormValues) {
//   const validated = projectSchema.safeParse(formData);

//   if (!validated.success) {
//     throw new Error("Invalid form data");
//   }

//   const project = await prisma.project.create({
//     data: validated.data,
//   });

//   return project;
// }
