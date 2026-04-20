"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  children: { id: string; name: string; slug: string }[];
}

interface CategoryNavProps {
  categories: Category[];
  mode?: "main" | "pets";
}

export function CategoryNav({ categories, mode = "main" }: CategoryNavProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathPrefix = mode === "pets" ? "/pets" : "";
  const router = useRouter();

  const handleCategoryClick = (id: string, slug: string) => {
    if (openId === id) {
      router.push(`${pathPrefix}/categorii/${slug}`);
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const handleMobileCategoryClick = (id: string, slug: string) => {
    if (openId === id) {
      router.push(`${pathPrefix}/categorii/${slug}`);
      setOpenId(null);
      setMobileOpen(false);
    } else {
      setOpenId(id);
    }
  };

  return (
    <nav className="bg-white border-b border-border">
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 h-12">
          {categories.map((cat) => (
            <div key={cat.id} className="relative">
              <button
                onClick={() => handleCategoryClick(cat.id, cat.slug)}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:bg-primary",
                  openId === cat.id && "bg-primary"
                )}
              >
                {cat.name}
                {cat.children.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openId === cat.id && "rotate-180"
                    )}
                  />
                )}
              </button>
              {openId === cat.id && cat.children.length > 0 && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenId(null)}
                  />
                  <div className="absolute left-0 top-full z-20 mt-1 w-56 border border-border bg-white shadow-lg py-1">
                    <Link
                      href={`${pathPrefix}/categorii/${cat.slug}`}
                      onClick={() => setOpenId(null)}
                      className="block px-4 py-2 text-sm font-medium text-secondary hover:bg-primary"
                    >
                      Toate din {cat.name}
                    </Link>
                    {cat.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`${pathPrefix}/categorii/${cat.slug}/${child.slug}`}
                        onClick={() => setOpenId(null)}
                        className="block px-4 py-2 text-sm hover:bg-primary"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center h-12">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="sm" className="gap-2" />}>
              <Menu className="h-4 w-4" />
              Categorii
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="px-4 pt-4 pb-2">Categorii</SheetTitle>
              <div className="overflow-y-auto h-full pb-20">
                {categories.map((cat) => (
                  <div key={cat.id} className="border-b border-border">
                    <button
                      onClick={() => handleMobileCategoryClick(cat.id, cat.slug)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-primary"
                    >
                      {cat.name}
                      {cat.children.length > 0 && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openId === cat.id && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                    {openId === cat.id && (
                      <div className="bg-primary/30 pb-1">
                        <Link
                          href={`${pathPrefix}/categorii/${cat.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-6 py-2 text-sm font-medium text-secondary"
                        >
                          Toate din {cat.name}
                        </Link>
                        {cat.children.map((child) => (
                          <Link
                            key={child.id}
                            href={`${pathPrefix}/categorii/${cat.slug}/${child.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block px-6 py-2 text-sm hover:bg-primary"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
