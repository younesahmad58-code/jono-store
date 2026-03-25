"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";

export function OrderSummary() {
  const { items, subtotal } = useCart();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;

  return (
    <div className="border rounded-lg p-6 h-fit sticky top-20">
      <h2 className="font-bold text-lg mb-4">Sumar comandă</h2>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.quantity}x {formatPrice(item.salePrice ?? item.price)}</p>
            </div>
            <span className="text-sm font-medium">
              {formatPrice((item.salePrice ?? item.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Livrare</span>
          <span>{shippingCost === 0 ? "Gratuită" : formatPrice(shippingCost)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
