import { getParentCategories, getNewProducts, getProductsOnSale } from "@/lib/queries";
import { HeroBanner, TrustBadges, CategoryGrid, ProductCarousel, WholesaleCTA } from "@/components/storefront/home";

export const dynamic = "force-dynamic";

function serializeProduct(p: {
  id: string;
  name: string;
  slug: string;
  price: unknown;
  salePrice: unknown;
  sku: string;
  stock: number;
  images: { url: string }[];
}) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    imageUrl: p.images[0]?.url ?? `https://picsum.photos/seed/${p.slug}/400/400`,
    sku: p.sku,
    stock: p.stock,
  };
}

export default async function HomePage() {
  const [categories, newProducts, saleProducts] = await Promise.all([
    getParentCategories(),
    getNewProducts(10),
    getProductsOnSale(10),
  ]);

  const categoriesData = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    imageUrl: c.imageUrl,
  }));

  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid categories={categoriesData} />
      <ProductCarousel
        title="NOUTĂȚI"
        products={newProducts.map(serializeProduct)}
      />
      <ProductCarousel
        title="OFERTE"
        products={saleProducts.map(serializeProduct)}
      />
      <WholesaleCTA />
    </>
  );
}
