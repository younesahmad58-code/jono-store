import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/queries";
import { ProductCard } from "@/components/storefront/ProductCard";
import { CategorySidebar, SortDropdown } from "@/components/storefront/category";
import { Pagination } from "@/components/storefront/Pagination";
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = slug[slug.length - 1];
  const category = await getCategoryBySlug(targetSlug);
  if (!category) return { title: "Categorie negăsită" };
  return {
    title: category.name,
    description: category.description ?? `Produse din categoria ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const targetSlug = slug[slug.length - 1];
  const category = await getCategoryBySlug(targetSlug);

  if (!category) notFound();

  const categoryIds = category.children.length > 0
    ? [category.id, ...category.children.map((c) => c.id)]
    : [category.id];

  const { products, totalPages, currentPage } = await getProductsByCategory(
    {
      categoryIds,
      minPrice: sp.minPrice ? parseFloat(sp.minPrice) : undefined,
      maxPrice: sp.maxPrice ? parseFloat(sp.maxPrice) : undefined,
      inStock: sp.inStock === "1",
    },
    {
      page: sp.page ? parseInt(sp.page, 10) : 1,
      sortBy: sp.sortBy ?? "createdAt",
      sortOrder: (sp.sortOrder as "asc" | "desc") ?? "desc",
    }
  );

  const parentSlug = slug[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Acasă</a>
        <span>/</span>
        {category.parent && (
          <>
            <a href={`/categorii/${category.parent.slug}`} className="hover:text-foreground">
              {category.parent.name}
            </a>
            <span>/</span>
          </>
        )}
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <CategorySidebar
            parentSlug={parentSlug}
            subcategories={category.children.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
            }))}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {products.length} produse
            </p>
            <SortDropdown />
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  slug={p.slug}
                  price={Number(p.price)}
                  salePrice={p.salePrice ? Number(p.salePrice) : null}
                  imageUrl={p.images[0]?.url ?? `https://picsum.photos/seed/${p.slug}/400/400`}
                  sku={p.sku}
                  stock={p.stock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nu am găsit produse cu filtrele selectate.
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/categorii/${slug.join("/")}`}
          />
        </div>
      </div>
    </div>
  );
}
