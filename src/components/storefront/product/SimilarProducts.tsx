import { getSimilarProducts } from "@/lib/queries";
import { ProductCard } from "@/components/storefront/ProductCard";

interface SimilarProductsProps {
  categoryId: string;
  excludeId: string;
}

export async function SimilarProducts({ categoryId, excludeId }: SimilarProductsProps) {
  const products = await getSimilarProducts(categoryId, excludeId);

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-6">Produse similare</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </section>
  );
}
