"use client";

import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckoutForm } from "@/components/storefront/checkout/CheckoutForm";
import { OrderSummary } from "@/components/storefront/checkout/OrderSummary";

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cos");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizare comandă</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
