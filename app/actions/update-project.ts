"use server";

import { prisma } from "@/lib/prisma"; // Adjust the path as needed
import { ProjectFormValues } from "@/lib/validation/project-schema";

export async function updateProject(id: string, data: ProjectFormValues) {
  try {
    await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
      },
    });
  } catch (error) {
    console.error("Failed to update project:", error);
    throw new Error("Unable to update project");
  }
}
