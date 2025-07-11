"use server";

import { prisma } from "@/lib/prisma"; // if you're using Prisma

export async function removeProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
  } catch (err) {
    console.error("Failed to delete project:", err);
    throw err;
  }
}
