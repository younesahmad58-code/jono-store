"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart, type CartItem } from "@/lib/cart";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  sku: string;
  stock: number;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  salePrice,
  imageUrl,
  sku,
  stock,
}: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const discount = salePrice ? calculateDiscount(price, salePrice) : 0;
  const effectivePrice = salePrice ?? price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock <= 0) return;

    const item: Omit<CartItem, "quantity"> = {
      id, name, slug, price, salePrice, imageUrl, sku, stock,
    };
    addItem(item, 1);
    openDrawer();
  };

  return (
    <Link
      href={`/produs/${slug}`}
      className="group bg-white border border-border hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600 text-white rounded-none text-xs">
            -{discount}%
          </Badge>
        )}
        {stock <= 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <Badge variant="outline" className="text-sm bg-white rounded-none">Stoc epuizat</Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2 flex-1">{name}</h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
          <span className="font-bold text-secondary">{formatPrice(effectivePrice)}</span>
          {salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {stock > 5 ? (
          <p className="text-xs font-medium text-green-600 mb-3">În stoc</p>
        ) : stock > 0 ? (
          <p className="text-xs font-medium text-amber-600 mb-3">Stoc limitat</p>
        ) : (
          <p className="text-xs font-medium text-destructive mb-3">Indisponibil</p>
        )}

        {stock > 0 ? (
          <Button
            size="sm"
            variant="secondary"
            className="w-full gap-2 rounded-none"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Adaugă în coș
          </Button>
        ) : (
          <Button size="sm" variant="secondary" className="w-full rounded-none" disabled>
            Indisponibil
          </Button>
        )}
      </div>
    </Link>
  );
}
