"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Sofa, Palette, Lamp, Shirt, Package } from "lucide-react";
import { HeroBanner } from "./HeroBanner";

interface CategoryChild {
  id: string;
  name: string;
  slug: string;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  children?: CategoryChild[];
}

interface HomepageHeroProps {
  categories: CategoryItem[];
  variant?: "main" | "pets";
}

const categoryIcons: Record<string, React.ElementType> = {
  "mobilier": Sofa,
  "decoratiuni": Palette,
  "iluminat": Lamp,
  "textile": Shirt,
  "organizare": Package,
};

function HomepageSidebar({ categories, pathPrefix }: { categories: CategoryItem[]; pathPrefix: string }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <aside className="hidden lg:block border border-border bg-white overflow-hidden">
      <div className="bg-secondary text-white px-4 py-3 font-semibold text-sm tracking-wide uppercase">
        Categorii
      </div>
      <nav>
        <ul>
          {categories.map((cat, i) => {
            const hasChildren = cat.children && cat.children.length > 0;
            const isOpen = openId === cat.id;
            const Icon = categoryIcons[cat.slug];

            return (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setOpenId(isOpen ? null : cat.id);
                    }
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-primary ${
                    i < categories.length - 1 && !isOpen ? "border-b border-border" : ""
                  } ${isOpen ? "bg-primary font-medium" : ""}`}
                >
                  <span className="flex items-center">
                    {Icon && <Icon className="h-4 w-4 mr-2 text-secondary/60" />}
                    {cat.name}
                  </span>
                  {hasChildren ? (
                    isOpen ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {isOpen && hasChildren && (
                  <div className="bg-primary/40 border-b border-border">
                    <Link
                      href={`${pathPrefix}/categorii/${cat.slug}`}
                      className="block px-6 py-2 text-sm font-medium text-secondary hover:bg-primary/60 transition-colors"
                    >
                      Vezi toate din {cat.name}
                    </Link>
                    {cat.children!.map((child) => (
                      <Link
                        key={child.id}
                        href={`${pathPrefix}/categorii/${cat.slug}/${child.slug}`}
                        className="block px-6 py-2 text-sm hover:bg-primary/60 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function HomepageHero({ categories, variant = "main" }: HomepageHeroProps) {
  const pathPrefix = variant === "pets" ? "/pets" : "";

  return (
    <section className="container mx-auto px-4 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
        <HomepageSidebar categories={categories} pathPrefix={pathPrefix} />

        <div className="border border-border lg:border-l-0 overflow-hidden">
          <HeroBanner variant={variant} />
        </div>
      </div>
    </section>
  );
}
