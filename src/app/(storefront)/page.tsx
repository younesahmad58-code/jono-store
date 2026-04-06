import { getBestsellers, getTrendingProducts, getProductsOnSale, getRecommendedProducts, getPetCategoryIds, getParentCategories } from "@/lib/queries";
import { HomepageHero, TrustBadges, ProductCarousel, WholesaleCTA, CategoryGrid, PromoBanners } from "@/components/storefront/home";

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
  const petCategoryIds = await getPetCategoryIds();

  const [bestsellers, trending, saleProducts, recommended, allCategories] = await Promise.all([
    getBestsellers(10, petCategoryIds),
    getTrendingProducts(10, petCategoryIds),
    getProductsOnSale(10, petCategoryIds),
    getRecommendedProducts(10, petCategoryIds),
    getParentCategories(),
  ]);

  const mainSaleProducts = saleProducts.filter(
    (p) => !petCategoryIds.includes(p.categoryId)
  );

  const mainCategories = allCategories
    .filter((c) => !petCategoryIds.includes(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      imageUrl: c.imageUrl,
      children: c.children.map((ch) => ({ id: ch.id, name: ch.name, slug: ch.slug })),
    }));

  return (
    <>
      <HomepageHero categories={mainCategories} />

      <TrustBadges />

      <CategoryGrid categories={mainCategories} />

      <ProductCarousel
        title="Cele mai vândute"
        href="/categorii?filter=bestseller"
        products={bestsellers.map(serializeProduct)}
      />

      <PromoBanners />

      <ProductCarousel
        title="Produse în Trend"
        href="/categorii?filter=trending"
        products={trending.map(serializeProduct)}
      />

      <ProductCarousel
        title="Produse în Promoții"
        href="/categorii?filter=promotii"
        products={mainSaleProducts.map(serializeProduct)}
      />

      <ProductCarousel
        title="Recomandate de Noi"
        href="/categorii?filter=recomandate"
        products={recommended.map(serializeProduct)}
      />

      <WholesaleCTA />
    </>
  );
}
