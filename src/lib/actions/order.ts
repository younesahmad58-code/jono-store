"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { checkoutSchema } from "@/lib/validations/order";
import { generateOrderNumber } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface CartItemInput {
  id: string;
  name: string;
  sku: string;
  ean?: string | null;
  price: number;
  salePrice: number | null;
  quantity: number;
}

interface PlaceOrderResult {
  success: boolean;
  error?: string;
  orderNumber?: string;
}

export async function placeOrderAction(
  formData: FormData,
  cartItems: CartItemInput[],
  subtotal: number,
  shippingCost: number
): Promise<PlaceOrderResult> {
  const raw: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    raw[key] = key === "isBusiness" ? value === "true" : value;
  });

  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, error: firstError ?? "Date invalide" };
  }

  if (!cartItems.length) {
    return { success: false, error: "Coșul este gol" };
  }

  const session = await auth();
  const orderNumber = generateOrderNumber();
  const total = subtotal + shippingCost;

  try {
    await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id ?? null,
        status: "NEW",
        subtotal,
        shippingCost,
        total,
        paymentMethod: parsed.data.paymentMethod,
        paymentStatus: "PENDING",
        shippingMethod: parsed.data.shippingMethod,
        notes: parsed.data.notes ?? null,
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            productSku: item.sku,
            productEan: item.ean ?? null,
            quantity: item.quantity,
            unitPrice: item.salePrice ?? item.price,
            totalPrice: (item.salePrice ?? item.price) * item.quantity,
          })),
        },
        shippingAddress: {
          create: {
            fullName: parsed.data.fullName,
            phone: parsed.data.phone,
            email: parsed.data.email,
            street: parsed.data.street,
            city: parsed.data.city,
            county: parsed.data.county,
            postalCode: parsed.data.postalCode,
            isBusiness: parsed.data.isBusiness,
            companyName: parsed.data.companyName ?? null,
            cui: parsed.data.cui ?? null,
            regCom: parsed.data.regCom ?? null,
          },
        },
      },
    });

    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    revalidatePath("/admin");
    return { success: true, orderNumber };
  } catch (error) {
    console.error("Order creation failed:", error);
    return { success: false, error: "Eroare la plasarea comenzii. Încearcă din nou." };
  }
}
