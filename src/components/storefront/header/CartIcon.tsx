"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { buttonVariants } from "@/components/ui/button";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cos" className={buttonVariants({ variant: "ghost", size: "icon", className: "relative" })}>
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
      <span className="sr-only">Coș de cumpărături</span>
    </Link>
  );
}
