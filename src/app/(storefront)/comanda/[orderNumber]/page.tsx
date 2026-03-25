import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      shippingAddress: true,
    },
  });

  if (!order) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Comandă plasată cu succes!</h1>
        <p className="text-muted-foreground">
          Mulțumim pentru comanda ta. Vei primi un email de confirmare.
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Număr comandă</p>
            <p className="font-bold text-lg">{order.orderNumber}</p>
          </div>
          <Badge variant="secondary">{order.status}</Badge>
        </div>

        <div className="text-sm text-muted-foreground">
          Plasată la {formatDateTime(order.createdAt)}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Produse comandate</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 text-sm">
              <span>{item.productName} x{item.quantity}</span>
              <span>{formatPrice(Number(item.totalPrice))}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(Number(order.subtotal))}</span>
          </div>
          <div className="flex justify-between">
            <span>Livrare</span>
            <span>{Number(order.shippingCost) === 0 ? "Gratuită" : formatPrice(Number(order.shippingCost))}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(Number(order.total))}</span>
          </div>
        </div>

        {order.shippingAddress && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Adresă de livrare</h3>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.county} {order.shippingAddress.postalCode}<br />
              Tel: {order.shippingAddress.phone}
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link href="/" className={buttonVariants()}>Înapoi la magazin</Link>
      </div>
    </div>
  );
}
