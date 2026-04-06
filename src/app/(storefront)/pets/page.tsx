import { getBestsellers, getTrendingProducts, getProductsOnSale, getRecommendedProducts, getPetCategoryIds, getParentCategories } from "@/lib/queries";
import { HomepageHero, TrustBadges, ProductCarousel, WholesaleCTA, CategoryGrid, PromoBanners } from "@/components/storefront/home";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JONO Pets",
  description: "Produse pentru animalul tău de companie — hrană, accesorii, jucării și îngrijire.",
};

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

export default async function PetsHomePage() {
  const petCategoryIds = await getPetCategoryIds();

  if (petCategoryIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">
          Secțiunea JONO Pets va fi disponibilă în curând.
        </p>
      </div>
    );
  }

  const allCategories = await getParentCategories();
  const petCategories = allCategories
    .filter((c) => petCategoryIds.includes(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      imageUrl: c.imageUrl,
      children: c.children.map((ch) => ({ id: ch.id, name: ch.name, slug: ch.slug })),
    }));

  const [bestsellers, trending, saleProducts, recommended] = await Promise.all([
    getBestsellers(10).then((p) => p.filter((prod) => petCategoryIds.includes(prod.categoryId))),
    getTrendingProducts(10).then((p) => p.filter((prod) => petCategoryIds.includes(prod.categoryId))),
    getProductsOnSale(10).then((p) => p.filter((prod) => petCategoryIds.includes(prod.categoryId))),
    getRecommendedProducts(10).then((p) => p.filter((prod) => petCategoryIds.includes(prod.categoryId))),
  ]);

  return (
    <>
      <HomepageHero categories={petCategories} variant="pets" />

      <TrustBadges />

      <CategoryGrid categories={petCategories} pathPrefix="/pets" />

      {bestsellers.length > 0 && (
        <ProductCarousel
          title="Bestsellers Pets"
          href="/pets/categorii?filter=bestseller"
          products={bestsellers.map(serializeProduct)}
        />
      )}

      <PromoBanners />

      {trending.length > 0 && (
        <ProductCarousel
          title="Produse în Trend"
          href="/pets/categorii?filter=trending"
          products={trending.map(serializeProduct)}
        />
      )}

      {saleProducts.length > 0 && (
        <ProductCarousel
          title="Oferte Pets"
          href="/pets/categorii?filter=promotii"
          products={saleProducts.map(serializeProduct)}
        />
      )}

      {recommended.length > 0 && (
        <ProductCarousel
          title="Recomandate"
          href="/pets/categorii?filter=recomandate"
          products={recommended.map(serializeProduct)}
        />
      )}

      <WholesaleCTA />
    </>
  );
}
