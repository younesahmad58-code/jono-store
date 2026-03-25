import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
  slug: z.string().min(2, "Slug-ul trebuie să aibă minim 2 caractere"),
  description: z.string().optional(),
  price: z.number().positive("Prețul trebuie să fie pozitiv"),
  salePrice: z.number().positive().optional().nullable(),
  sku: z.string().min(1, "SKU este obligatoriu"),
  ean: z.string().optional().nullable(),
  stock: z.number().int().min(0, "Stocul nu poate fi negativ"),
  weight: z.number().positive().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "HIDDEN"]),
  categoryId: z.string().uuid("Selectează o categorie"),
});

export type ProductInput = z.infer<typeof productSchema>;
