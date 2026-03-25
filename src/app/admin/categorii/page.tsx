import { getCategoryTree } from "@/lib/queries";
import { CategoryManager } from "@/components/admin/categories/CategoryManager";

export const dynamic = "force-dynamic";

export const metadata = { title: "Categorii" };

export default async function AdminCategoriesPage() {
  const tree = await getCategoryTree();

  const categories = tree.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    sortOrder: c.sortOrder,
    isActive: c.isActive,
    productCount: c._count.products,
    children: c.children.map((ch) => ({
      id: ch.id,
      name: ch.name,
      slug: ch.slug,
      sortOrder: ch.sortOrder,
      isActive: ch.isActive,
      productCount: ch._count.products,
    })),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorii</h1>
      <CategoryManager categories={categories} />
    </div>
  );
}
