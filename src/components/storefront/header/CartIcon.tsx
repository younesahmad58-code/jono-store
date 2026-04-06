"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function CartIcon() {
  const { totalItems, openDrawer } = useCart();

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={openDrawer}>
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
      <span className="sr-only">Coș de cumpărături</span>
    </Button>
  );
}
