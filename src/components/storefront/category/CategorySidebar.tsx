"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useCallback } from "react";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface CategorySidebarProps {
  parentSlug: string;
  subcategories: Subcategory[];
}

export function CategorySidebar({ parentSlug, subcategories }: CategorySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [minPrice, maxPrice, router, pathname, searchParams]);

  const toggleInStock = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("inStock")) params.delete("inStock");
    else params.set("inStock", "1");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  return (
    <aside className="space-y-6">
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Subcategorii</h3>
          <ul className="space-y-1">
            {subcategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/categorii/${parentSlug}/${sub.slug}`}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">Preț (RON)</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24"
          />
        </div>
        <Button size="sm" variant="outline" onClick={applyFilters} className="mt-2 w-full">
          Aplică
        </Button>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Disponibilitate</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="inStock"
            checked={!!searchParams.get("inStock")}
            onCheckedChange={toggleInStock}
          />
          <Label htmlFor="inStock" className="text-sm cursor-pointer">
            Doar produse în stoc
          </Label>
        </div>
      </div>
    </aside>
  );
}
