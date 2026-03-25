import { searchProducts } from "@/lib/queries";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Pagination } from "@/components/storefront/Pagination";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  return { title: sp.q ? `Rezultate pentru "${sp.q}"` : "Căutare" };
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp.q ?? "";
  const page = sp.page ? parseInt(sp.page, 10) : 1;

  const { products, totalPages, currentPage } = query
    ? await searchProducts(query, page)
    : { products: [], totalPages: 0, currentPage: 1 };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Rezultate căutare</h1>
      {query && (
        <p className="text-muted-foreground mb-8">
          {products.length} rezultate pentru &quot;{query}&quot;
        </p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      ) : query ? (
        <p className="text-center py-12 text-muted-foreground">
          Nu am găsit produse pentru căutarea ta.
        </p>
      ) : (
        <p className="text-center py-12 text-muted-foreground">
          Introdu un termen de căutare.
        </p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/cautare" />
    </div>
  );
}
