"use server";

import { prisma } from "@/lib/db";
import { OrderStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function updateOrderStatusAction(
  id: string,
  status: OrderStatus
): Promise<ActionResult> {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/comenzi");
    revalidatePath(`/admin/comenzi/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Order status update failed:", error);
    return { success: false, error: "Eroare la actualizarea statusului" };
  }
}

export async function updateOrderPaymentAction(
  id: string,
  paymentStatus: "PENDING" | "PAID" | "REFUNDED"
): Promise<ActionResult> {
  try {
    await prisma.order.update({
      where: { id },
      data: { paymentStatus },
    });
    revalidatePath("/admin/comenzi");
    revalidatePath(`/admin/comenzi/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Payment status update failed:", error);
    return { success: false, error: "Eroare la actualizarea statusului plății" };
  }
}
