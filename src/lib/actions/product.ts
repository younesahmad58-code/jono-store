"use server";

import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  error?: string;
}

const NUMERIC_FIELDS = new Set(["price", "salePrice", "stock", "weight"]);
const BOOLEAN_FIELDS = new Set(["isBestseller", "isTrending", "isRecommended"]);

function parseFormData(formData: FormData): Record<string, unknown> {
  const raw: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (key === "imageUrls" || key === "imageAlts") return;
    if (NUMERIC_FIELDS.has(key)) {
      const str = String(value);
      raw[key] = str === "" ? undefined : Number(str);
    } else if (BOOLEAN_FIELDS.has(key)) {
      raw[key] = String(value) === "true" || String(value) === "on";
    } else {
      raw[key] = value;
    }
  });
  for (const field of BOOLEAN_FIELDS) {
    if (!(field in raw)) raw[field] = false;
  }
  return raw;
}

export async function createProductAction(formData: FormData): Promise<ActionResult> {
  const raw = parseFormData(formData);

  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, error: firstError ?? "Date invalide" };
  }

  const imageUrls = formData.getAll("imageUrls") as string[];
  const imageAlts = formData.getAll("imageAlts") as string[];

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        images: {
          create: imageUrls.map((url, i) => ({
            url,
            alt: imageAlts[i] || parsed.data.name,
            sortOrder: i,
          })),
        },
      },
    });

    revalidatePath("/admin/produse");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Product creation failed:", error);
    return { success: false, error: "Eroare la crearea produsului" };
  }
}

export async function updateProductAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = parseFormData(formData);

  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, error: firstError ?? "Date invalide" };
  }

  const imageUrls = formData.getAll("imageUrls") as string[];
  const imageAlts = formData.getAll("imageAlts") as string[];

  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: parsed.data,
      });

      await tx.productImage.deleteMany({ where: { productId: id } });

      if (imageUrls.length > 0) {
        await tx.productImage.createMany({
          data: imageUrls.map((url, i) => ({
            productId: id,
            url,
            alt: imageAlts[i] || parsed.data.name,
            sortOrder: i,
          })),
        });
      }
    });

    revalidatePath("/admin/produse");
    revalidatePath(`/produs/${parsed.data.slug}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Product update failed:", error);
    return { success: false, error: "Eroare la actualizarea produsului" };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/produse");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Product deletion failed:", error);
    return { success: false, error: "Eroare la ștergerea produsului" };
  }
}
