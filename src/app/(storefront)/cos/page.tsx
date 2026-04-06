"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "@/lib/constants";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Coșul este gol</h1>
        <p className="text-muted-foreground mb-6">Adaugă produse în coș pentru a continua.</p>
        <Link href="/" className={buttonVariants()}>Continuă cumpărăturile</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coș de cumpărături</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-wrap sm:flex-nowrap gap-4 p-4 border">
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/produs/${item.slug}`} className="font-medium hover:text-secondary line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                <p className="font-semibold text-secondary mt-1">
                  {formatPrice(item.salePrice ?? item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center border border-secondary/20">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <span className="font-semibold text-right">
                  {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                </span>

                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border p-6 h-fit sticky top-20">
          <h2 className="font-bold text-lg mb-4">Sumar comandă</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livrare</span>
              <span>{shippingCost === 0 ? "Gratuită" : formatPrice(shippingCost)}</span>
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-muted-foreground">
                Mai adaugă {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} pentru livrare gratuită
              </p>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Link href="/checkout" className={buttonVariants({ size: "lg", variant: "secondary", className: "w-full mt-4 rounded-none" })}>Finalizează comanda</Link>

          <Link href="/" className={buttonVariants({ variant: "outline", className: "w-full mt-2" })}>Continuă cumpărăturile</Link>
        </div>
      </div>
    </div>
  );
}
