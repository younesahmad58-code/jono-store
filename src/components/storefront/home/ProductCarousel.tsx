"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/storefront/ProductCard";

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
  href?: string;
  products: ProductData[];
}

export function ProductCarousel({ title, href, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll, products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 220;
    const amount = cardWidth * 3;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  const titleClass = `text-xl sm:text-2xl font-bold text-foreground ${
    href ? "hover:text-secondary transition-colors" : ""
  }`;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          {href ? (
            <Link href={href} className={titleClass}>{title}</Link>
          ) : (
            <span className={titleClass}>{title}</span>
          )}
          <div className="w-12 h-0.5 bg-secondary mt-2" />
        </div>

        {href && (
          <Link href={href} className="text-sm font-medium text-secondary hover:underline">
            Vezi toate &rarr;
          </Link>
        )}
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2.5 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Scroll stânga"
          >
            <ChevronLeft className="h-5 w-5 text-secondary" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[calc((100%-4*1rem)/5)] flex-shrink-0 snap-start"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2.5 transition-colors hidden sm:flex items-center justify-center"
            aria-label="Scroll dreapta"
          >
            <ChevronRight className="h-5 w-5 text-secondary" />
          </button>
        )}
      </div>
    </section>
  );
}
