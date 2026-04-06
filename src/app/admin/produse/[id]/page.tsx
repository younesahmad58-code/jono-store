import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCategoryTree } from "@/lib/queries";
import { ProductForm } from "@/components/admin/products/ProductForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Editează produs" };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product, tree] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    getCategoryTree(),
  ]);

  if (!product) notFound();

  const categories = tree.map((c) => ({
    id: c.id,
    name: c.name,
    children: c.children.map((ch) => ({ id: ch.id, name: ch.name })),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editează: {product.name}</h1>
      <ProductForm
        categories={categories}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: Number(product.price),
          salePrice: product.salePrice ? Number(product.salePrice) : null,
          sku: product.sku,
          ean: product.ean,
          stock: product.stock,
          weight: product.weight ? Number(product.weight) : null,
          status: product.status,
          isBestseller: product.isBestseller,
          isTrending: product.isTrending,
          isRecommended: product.isRecommended,
          categoryId: product.categoryId,
          images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
        }}
      />
    </div>
  );
}
