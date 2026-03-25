import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderStatusChanger } from "@/components/admin/orders/OrderStatusChanger";
import { OrderActionButtons } from "@/components/admin/orders/OrderActionButtons";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Detalii comandă" };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      shippingAddress: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/comenzi" className="text-sm text-muted-foreground hover:text-foreground">
            ← Înapoi la comenzi
          </Link>
          <h1 className="text-2xl font-bold mt-1">Comandă {order.orderNumber}</h1>
          <p className="text-sm text-muted-foreground">{formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusChanger orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Client</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <p className="font-medium">{order.shippingAddress?.fullName ?? order.user?.name ?? "—"}</p>
            <p>{order.shippingAddress?.email ?? order.user?.email ?? "—"}</p>
            <p>{order.shippingAddress?.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Adresă livrare</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            {order.shippingAddress ? (
              <>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.county}</p>
                <p>{order.shippingAddress.postalCode}</p>
                {order.shippingAddress.isBusiness && (
                  <div className="pt-2 border-t mt-2">
                    <p className="font-medium">{order.shippingAddress.companyName}</p>
                    <p>CUI: {order.shippingAddress.cui}</p>
                    {order.shippingAddress.regCom && <p>Reg: {order.shippingAddress.regCom}</p>}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Plată și livrare</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Metodă plată</span>
              <Badge variant="secondary">{order.paymentMethod}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Status plată</span>
              <Badge variant={order.paymentStatus === "PAID" ? "default" : "secondary"}>
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Metodă livrare</span>
              <span>{order.shippingMethod}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Produse comandate</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produs</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Cantitate</TableHead>
                <TableHead className="text-right">Preț unitar</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.productSku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatPrice(Number(item.unitPrice))}</TableCell>
                  <TableCell className="text-right font-medium">{formatPrice(Number(item.totalPrice))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 space-y-1 text-sm text-right">
            <div>Subtotal: {formatPrice(Number(order.subtotal))}</div>
            <div>Livrare: {Number(order.shippingCost) === 0 ? "Gratuită" : formatPrice(Number(order.shippingCost))}</div>
            <div className="font-bold text-base">Total: {formatPrice(Number(order.total))}</div>
          </div>
        </CardContent>
      </Card>

      {order.notes && (
        <Card>
          <CardHeader><CardTitle className="text-base">Observații</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{order.notes}</p></CardContent>
        </Card>
      )}

      <OrderActionButtons orderId={order.id} />
    </div>
  );
}
