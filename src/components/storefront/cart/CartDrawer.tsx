"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, drawerOpen, closeDrawer } = useCart();

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Sheet open={drawerOpen} onOpenChange={(open) => { if (!open) closeDrawer(); }}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-4 pt-4 pb-3 border-b border-border">
          <SheetTitle>Coșul tău ({totalItems} {totalItems === 1 ? "produs" : "produse"})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Coșul tău este gol</p>
            <Button variant="secondary" className="rounded-none" onClick={closeDrawer}>
              Continuă cumpărăturile
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Link
                    href={`/produs/${item.slug}`}
                    onClick={closeDrawer}
                    className="relative w-16 h-16 flex-shrink-0 border border-border overflow-hidden"
                  >
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/produs/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-medium hover:text-secondary line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-semibold text-secondary mt-0.5">
                      {formatPrice(item.salePrice ?? item.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center border border-secondary/20">
                        <button
                          className="h-6 w-6 flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          className="h-6 w-6 flex items-center justify-center text-secondary hover:bg-primary transition-colors"
                          onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                        onClick={() => removeItem(item.id)}
                        aria-label="Șterge"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border px-4 py-4 gap-3">
              {amountToFreeShipping > 0 ? (
                <div className="w-full">
                  <p className="text-xs text-muted-foreground mb-1.5">
                    Mai adaugă {formatPrice(amountToFreeShipping)} pentru livrare gratuită
                  </p>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-green-600 font-medium w-full">Transport gratuit!</p>
              )}

              <Separator />

              <div className="flex justify-between items-center w-full text-sm">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-secondary">{formatPrice(subtotal)}</span>
              </div>

              <Link
                href="/cos"
                onClick={closeDrawer}
                className={buttonVariants({ variant: "outline", className: "w-full rounded-none" })}
              >
                Vezi coșul
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className={buttonVariants({ variant: "secondary", className: "w-full rounded-none" })}
              >
                Finalizează comanda
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
