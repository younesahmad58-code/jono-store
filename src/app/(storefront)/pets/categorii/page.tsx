import type { Metadata } from "next";
import { getBestsellers, getTrendingProducts, getProductsOnSale, getRecommendedProducts, getPetCategoryIds } from "@/lib/queries";
import { ProductCard } from "@/components/storefront/ProductCard";

export const dynamic = "force-dynamic";

const FILTER_CONFIG: Record<string, { title: string; description: string }> = {
  bestseller: { title: "Bestsellers Pets", description: "Cele mai populare produse pentru animale" },
  trending: { title: "Produse în Trend", description: "Produse sezoniere pentru animale" },
  promotii: { title: "Oferte Pets", description: "Cele mai bune oferte pentru animale" },
  recomandate: { title: "Recomandate Pets", description: "Selecția noastră pentru animalul tău" },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const config = sp.filter ? FILTER_CONFIG[sp.filter] : null;
  return {
    title: config?.title ?? "Categorii Pets",
    description: config?.description ?? "Categorii de produse pentru animale",
  };
}

export default async function PetsCategoriesFilterPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filter = sp.filter;
  const petCategoryIds = await getPetCategoryIds();

  if (!filter || !FILTER_CONFIG[filter]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categorii Pets</h1>
        <p className="text-muted-foreground">Selectează o categorie din meniu.</p>
      </div>
    );
  }

  const config = FILTER_CONFIG[filter];

  let products: Awaited<ReturnType<typeof getBestsellers>>;
  switch (filter) {
    case "bestseller":
      products = await getBestsellers(50);
      break;
    case "trending":
      products = await getTrendingProducts(50);
      break;
    case "promotii":
      products = await getProductsOnSale(50);
      break;
    case "recomandate":
      products = await getRecommendedProducts(50);
      break;
    default:
      products = [];
  }

  const petProducts = products.filter((p) => petCategoryIds.includes(p.categoryId));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <a href="/pets" className="hover:text-foreground">JONO Pets</a>
        <span>/</span>
        <span className="text-foreground font-medium">{config.title}</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
      <p className="text-muted-foreground mb-8">{config.description}</p>

      {petProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {petProducts.map((p) => (
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
          Nu sunt produse pets disponibile momentan.
        </div>
      )}
    </div>
  );
}
