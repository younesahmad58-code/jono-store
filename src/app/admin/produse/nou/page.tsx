import { getCategoryTree } from "@/lib/queries";
import { ProductForm } from "@/components/admin/products/ProductForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Adaugă produs" };

export default async function NewProductPage() {
  const tree = await getCategoryTree();

  const categories = tree.map((c) => ({
    id: c.id,
    name: c.name,
    children: c.children.map((ch) => ({ id: ch.id, name: ch.name })),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă produs nou</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
