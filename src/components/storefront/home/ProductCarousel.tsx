"use client";

import { ProductCard } from "@/components/storefront/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  sku: string;
  stock: number;
}

interface ProductCarouselProps {
  title: string;
  products: ProductData[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {products.map((product) => (
            <div key={product.id} className="w-[200px] md:w-[220px] flex-shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
