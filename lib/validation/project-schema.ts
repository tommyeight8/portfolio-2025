import { z } from "zod";

export const categories = [
  "GRAPHIC_DESIGN",
  "FULL_STACK",
  "WEB_DESIGN",
  "SHOPIFY_DEVELOPMENT",
  "SHOPIFY_STORE_FRONT",
] as const;

export const projectSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  imageUrl: z.string().url(),
  category: z.enum(categories),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export interface ProjectWithId extends ProjectFormValues {
  id: string;
  position: number;
}
