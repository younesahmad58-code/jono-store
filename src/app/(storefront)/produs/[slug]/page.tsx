import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/queries";
import { ImageGallery, ProductInfo, ProductDescription, SimilarProducts } from "@/components/storefront/product";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produs negăsit" };

  return {
    title: product.name,
    description: product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ?? product.name,
    openGraph: {
      title: product.name,
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.status !== "PUBLISHED") notFound();

  const breadcrumbCategory = product.category.parent ?? product.category;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">Acasă</a>
        <span>/</span>
        <a href={`/categorii/${breadcrumbCategory.slug}`} className="hover:text-foreground">
          {breadcrumbCategory.name}
        </a>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageGallery
          images={product.images.map((img) => ({ id: img.id, url: img.url, alt: img.alt }))}
          productName={product.name}
        />

        <ProductInfo
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={Number(product.price)}
          salePrice={product.salePrice ? Number(product.salePrice) : null}
          sku={product.sku}
          stock={product.stock}
          imageUrl={product.images[0]?.url ?? `https://picsum.photos/seed/${product.slug}/400/400`}
        />
      </div>

      <ProductDescription
        description={product.description}
        weight={product.weight ? Number(product.weight) : null}
        sku={product.sku}
        ean={product.ean}
      />

      <SimilarProducts categoryId={product.categoryId} excludeId={product.id} />
    </div>
  );
}
