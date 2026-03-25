"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function updateSettingsAction(
  entries: { key: string; value: string; group: string }[]
): Promise<ActionResult> {
  try {
    for (const entry of entries) {
      await prisma.siteSetting.upsert({
        where: { key: entry.key },
        update: { value: entry.value },
        create: entry,
      });
    }
    revalidatePath("/admin/setari");
    return { success: true };
  } catch (error) {
    console.error("Settings update failed:", error);
    return { success: false, error: "Eroare la salvarea setărilor" };
  }
}
