// app/actions/reorder-projects.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ProjectOrder = { id: string; position: number };

export async function reorderProjects(updatedOrder: ProjectOrder[]) {
  try {
    const updates = updatedOrder.map(({ id, position }) =>
      prisma.project.update({
        where: { id },
        data: { position },
      })
    );

    await Promise.all(updates);
    revalidatePath("/dashboard"); // or wherever the list lives
    return { success: true };
  } catch (error) {
    console.error("Failed to persist project order:", error);
    return { success: false, error: "Failed to save order." };
  }
}
