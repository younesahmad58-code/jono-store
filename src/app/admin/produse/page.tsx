import Link from "next/link";
import { prisma } from "@/lib/db";
import { ADMIN_ITEMS_PER_PAGE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Pagination } from "@/components/storefront/Pagination";
import { DeleteProductButton } from "@/components/admin/products/DeleteProductButton";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

export const metadata = { title: "Produse" };

export default async function AdminProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = sp.page ? parseInt(sp.page, 10) : 1;
  const search = sp.search ?? "";
  const status = sp.status ?? "";

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_ITEMS_PER_PAGE,
      take: ADMIN_ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ADMIN_ITEMS_PER_PAGE);

  const statusColors: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    HIDDEN: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produse ({total})</h1>
        <Link href="/admin/produse/nou" className={buttonVariants()}><Plus className="h-4 w-4 mr-2" />Adaugă produs</Link>
      </div>

      <form className="flex gap-2" method="get">
        <Input name="search" placeholder="Caută după nume sau SKU..." defaultValue={search} className="max-w-sm" />
        <select name="status" defaultValue={status} className="border rounded-md px-3 py-2 text-sm bg-white">
          <option value="">Toate statusurile</option>
          <option value="PUBLISHED">Publicat</option>
          <option value="DRAFT">Draft</option>
          <option value="HIDDEN">Ascuns</option>
        </select>
        <Button type="submit" variant="secondary">Filtrează</Button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Produs</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Preț</TableHead>
              <TableHead>Stoc</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="relative w-10 h-10 rounded overflow-hidden">
                    <Image
                      src={p.images[0]?.url ?? `https://picsum.photos/seed/${p.slug}/100/100`}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.sku}</TableCell>
                <TableCell>
                  <div>{formatPrice(Number(p.price))}</div>
                  {p.salePrice && (
                    <div className="text-xs text-red-600">{formatPrice(Number(p.salePrice))}</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={p.stock === 0 ? "destructive" : "secondary"}>{p.stock}</Badge>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{p.category.name}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/produse/${p.id}`} className="text-sm text-primary hover:underline">
                    Editează
                  </Link>
                  <DeleteProductButton productId={p.id} productName={p.name} />
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nu s-au găsit produse
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/admin/produse" />
    </div>
  );
}
