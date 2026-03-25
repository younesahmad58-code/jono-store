"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

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
  const { addItem } = useCart();
  const discount = salePrice ? calculateDiscount(price, salePrice) : 0;
  const effectivePrice = salePrice ?? price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (stock <= 0) return;

    const item: Omit<CartItem, "quantity"> = {
      id,
      name,
      slug,
      price,
      salePrice,
      imageUrl,
      sku,
      stock,
    };
    addItem(item);
    toast.success(`${name} a fost adăugat în coș`);
  };

  return (
    <Link
      href={`/produs/${slug}`}
      className="group bg-white rounded-lg border hover:shadow-md transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}
        {stock <= 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">Stoc epuizat</Badge>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 flex-1">{name}</h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-primary">{formatPrice(effectivePrice)}</span>
          {salePrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          className="w-full gap-2"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {stock > 0 ? "Adaugă în coș" : "Indisponibil"}
        </Button>
      </div>
    </Link>
  );
}
