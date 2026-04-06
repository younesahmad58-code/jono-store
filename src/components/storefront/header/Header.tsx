import Link from "next/link";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { JonoLogo } from "@/components/storefront/JonoLogo";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { UserMenu } from "./UserMenu";
import { CategoryNav } from "./CategoryNav";
import { SiteToggle } from "./SiteToggle";
import { getParentCategories, getPetCategoryIds } from "@/lib/queries/categories";

interface HeaderProps {
  mode?: "main" | "pets";
  pathname?: string;
}

export async function Header({ mode = "main", pathname = "" }: HeaderProps) {
  const [allCategories, petCategoryIds] = await Promise.all([
    getParentCategories(),
    getPetCategoryIds(),
  ]);

  const petParentSlugs = new Set<string>();
  const filteredCategories = allCategories.filter((c) => {
    const isPetCategory = petCategoryIds.includes(c.id);
    if (isPetCategory) petParentSlugs.add(c.slug);
    return mode === "pets" ? isPetCategory : !isPetCategory;
  });

  const serialized = filteredCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    children: c.children.map((ch) => ({
      id: ch.id,
      name: ch.name,
      slug: ch.slug,
    })),
  }));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 gap-4">
          <Link href={mode === "pets" ? "/pets" : "/"} className="flex-shrink-0">
            <JonoLogo
              variant={mode}
              className="h-10 sm:h-12 text-secondary"
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center max-w-lg">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2">
            <SiteToggle />
            <Link href="/cont" className={buttonVariants({ variant: "ghost", size: "icon", className: "hidden sm:flex" })}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorite</span>
            </Link>
            <CartIcon />
            <UserMenu />
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {pathname !== "/" && pathname !== "/pets" && (
        <CategoryNav categories={serialized} mode={mode} />
      )}
    </header>
  );
}
