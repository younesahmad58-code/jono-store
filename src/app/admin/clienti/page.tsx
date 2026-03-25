import { prisma } from "@/lib/db";
import { ADMIN_ITEMS_PER_PAGE } from "@/lib/constants";
import { formatDate, formatPrice } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/storefront/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export const metadata = { title: "Clienți" };

export default async function AdminCustomersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = sp.page ? parseInt(sp.page, 10) : 1;
  const search = sp.search ?? "";

  const where: Record<string, unknown> = { role: "CUSTOMER" };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        _count: { select: { orders: true } },
        orders: { select: { total: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_ITEMS_PER_PAGE,
      take: ADMIN_ITEMS_PER_PAGE,
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ADMIN_ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Clienți ({total})</h1>

      <form className="flex gap-2" method="get">
        <Input name="search" placeholder="Caută după nume sau email..." defaultValue={search} className="max-w-sm" />
        <Button type="submit" variant="secondary">Caută</Button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nume</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data înregistrării</TableHead>
              <TableHead>Comenzi</TableHead>
              <TableHead>Total cheltuit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const totalSpent = customer.orders.reduce(
                (sum, o) => sum + Number(o.total),
                0
              );
              return (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name ?? "—"}</TableCell>
                  <TableCell className="text-sm">{customer.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(customer.createdAt)}
                  </TableCell>
                  <TableCell>{customer._count.orders}</TableCell>
                  <TableCell className="font-medium">{formatPrice(totalSpent)}</TableCell>
                </TableRow>
              );
            })}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nu s-au găsit clienți
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/admin/clienti" />
    </div>
  );
}
