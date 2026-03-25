import Link from "next/link";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { UserMenu } from "./UserMenu";
import { CategoryNav } from "./CategoryNav";
import { getParentCategories } from "@/lib/queries/categories";

export async function Header() {
  const categories = await getParentCategories();

  const serialized = categories.map((c) => ({
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
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">AramSweet</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center max-w-lg">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1">
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

      <CategoryNav categories={serialized} />
    </header>
  );
}
