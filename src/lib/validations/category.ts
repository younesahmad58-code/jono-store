import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
  slug: z.string().min(2, "Slug-ul trebuie să aibă minim 2 caractere"),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  parentId: z.string().uuid().optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type CategoryInput = z.infer<typeof categorySchema>;
