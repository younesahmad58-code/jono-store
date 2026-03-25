import { prisma } from "@/lib/db";
import Link from "next/link";
import { ADMIN_ITEMS_PER_PAGE } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { Pagination } from "@/components/storefront/Pagination";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}

export const metadata = { title: "Comenzi" };

const statusLabels: Record<string, string> = {
  NEW: "Nouă",
  CONFIRMED: "Confirmată",
  PROCESSING: "În procesare",
  SHIPPED: "Expediată",
  DELIVERED: "Livrată",
  COMPLETED: "Finalizată",
  RETURNED: "Returnată",
};

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-indigo-100 text-indigo-800",
  PROCESSING: "bg-amber-100 text-amber-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  RETURNED: "bg-red-100 text-red-800",
};

export default async function AdminOrdersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = sp.page ? parseInt(sp.page, 10) : 1;

  const where: Record<string, unknown> = {};
  if (sp.search) {
    where.orderNumber = { contains: sp.search, mode: "insensitive" };
  }
  if (sp.status) where.status = sp.status;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        shippingAddress: { select: { fullName: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_ITEMS_PER_PAGE,
      take: ADMIN_ITEMS_PER_PAGE,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ADMIN_ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Comenzi ({total})</h1>

      <form className="flex gap-2" method="get">
        <Input name="search" placeholder="Caută după nr. comandă..." defaultValue={sp.search ?? ""} className="max-w-sm" />
        <select name="status" defaultValue={sp.status ?? ""} className="border rounded-md px-3 py-2 text-sm bg-white">
          <option value="">Toate statusurile</option>
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <Button type="submit" variant="secondary">Filtrează</Button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comandă</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Plată</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell className="text-sm">
                  {order.shippingAddress?.fullName ?? order.user?.name ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(order.createdAt)}
                </TableCell>
                <TableCell className="font-medium">{formatPrice(Number(order.total))}</TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === "PAID" ? "default" : "secondary"} className="text-xs">
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/comenzi/${order.id}`} className="text-sm text-primary hover:underline">
                    Detalii
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nu s-au găsit comenzi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/admin/comenzi" />
    </div>
  );
}
