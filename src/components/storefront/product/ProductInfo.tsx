"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

interface ProductInfoProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  sku: string;
  stock: number;
  imageUrl: string;
}

export function ProductInfo({ id, name, slug, price, salePrice, sku, stock, imageUrl }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const discount = salePrice ? calculateDiscount(price, salePrice) : 0;
  const effectivePrice = salePrice ?? price;

  const handleAdd = () => {
    if (stock <= 0) return;
    const item: Omit<CartItem, "quantity"> = { id, name, slug, price, salePrice, imageUrl, sku, stock };
    addItem(item, quantity);
    toast.success(`${name} a fost adăugat în coș`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-primary">
          {formatPrice(effectivePrice)}
        </span>
        {salePrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
            <Badge className="bg-red-600 hover:bg-red-600">-{discount}%</Badge>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {stock > 0 ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">În stoc ({stock} buc.)</span>
          </>
        ) : (
          <span className="text-destructive font-medium">Stoc epuizat</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">SKU: {sku}</p>

      {stock > 0 && (
        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button size="lg" className="gap-2 flex-1" onClick={handleAdd}>
            <ShoppingCart className="h-5 w-5" />
            Adaugă în coș
          </Button>
        </div>
      )}
    </div>
  );
}
