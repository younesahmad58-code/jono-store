"use server";

import { prisma } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function createCategoryAction(formData: FormData): Promise<ActionResult> {
  const raw: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (key === "isActive") raw[key] = value === "true";
    else if (key === "sortOrder") raw[key] = parseInt(value as string, 10);
    else if (value === "") raw[key] = null;
    else raw[key] = value;
  });

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, error: firstError ?? "Date invalide" };
  }

  try {
    await prisma.category.create({ data: parsed.data });
    revalidatePath("/admin/categorii");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Category creation failed:", error);
    return { success: false, error: "Eroare la crearea categoriei" };
  }
}

export async function updateCategoryAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const raw: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    if (key === "isActive") raw[key] = value === "true";
    else if (key === "sortOrder") raw[key] = parseInt(value as string, 10);
    else if (value === "") raw[key] = null;
    else raw[key] = value;
  });

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, error: firstError ?? "Date invalide" };
  }

  try {
    await prisma.category.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/categorii");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Category update failed:", error);
    return { success: false, error: "Eroare la actualizarea categoriei" };
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  try {
    const hasProducts = await prisma.product.count({ where: { categoryId: id } });
    if (hasProducts > 0) {
      return { success: false, error: "Categoria conține produse și nu poate fi ștearsă" };
    }

    const hasChildren = await prisma.category.count({ where: { parentId: id } });
    if (hasChildren > 0) {
      return { success: false, error: "Categoria conține subcategorii și nu poate fi ștearsă" };
    }

    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categorii");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Category deletion failed:", error);
    return { success: false, error: "Eroare la ștergerea categoriei" };
  }
}
