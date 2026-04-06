import type { Metadata } from "next";
import { getBestsellers, getTrendingProducts, getProductsOnSale, getRecommendedProducts, getParentCategories, getPetCategoryIds } from "@/lib/queries";
import { ProductCard } from "@/components/storefront/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const FILTER_CONFIG: Record<string, { title: string; description: string }> = {
  bestseller: { title: "Cele mai vândute", description: "Produsele noastre cele mai populare" },
  trending: { title: "Produse în Trend", description: "Produse sezoniere și în tendințe" },
  promotii: { title: "Produse în Promoții", description: "Cele mai bune oferte" },
  recomandate: { title: "Recomandate de Noi", description: "Selecția noastră de produse" },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const config = sp.filter ? FILTER_CONFIG[sp.filter] : null;
  return {
    title: config?.title ?? "Categorii",
    description: config?.description ?? "Toate categoriile de produse",
  };
}

export default async function CategoriesFilterPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filter = sp.filter;
  const petCategoryIds = await getPetCategoryIds();

  if (!filter || !FILTER_CONFIG[filter]) {
    const categories = await getParentCategories();
    const mainCategories = categories.filter((c) => !petCategoryIds.includes(c.id));

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categorii</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mainCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorii/${cat.slug}`}
              className="border border-border p-6 text-center hover:bg-primary/20 transition-colors"
            >
              <h2 className="font-semibold">{cat.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {cat.children.length} subcategorii
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const config = FILTER_CONFIG[filter];

  let products: Awaited<ReturnType<typeof getBestsellers>>;
  switch (filter) {
    case "bestseller":
      products = await getBestsellers(50, petCategoryIds);
      break;
    case "trending":
      products = await getTrendingProducts(50, petCategoryIds);
      break;
    case "promotii":
      products = await getProductsOnSale(50);
      break;
    case "recomandate":
      products = await getRecommendedProducts(50, petCategoryIds);
      break;
    default:
      products = [];
  }

  const mainProducts = filter === "promotii"
    ? products.filter((p) => !petCategoryIds.includes(p.categoryId))
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{config.title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
      <p className="text-muted-foreground mb-8">{config.description}</p>

      {mainProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mainProducts.map((p) => (
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
          Nu sunt produse disponibile momentan.
        </div>
      )}
    </div>
  );
}
