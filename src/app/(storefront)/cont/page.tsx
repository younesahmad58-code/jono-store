import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Contul meu" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Contul meu</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Informații cont</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><span className="font-medium">Nume:</span> {session.user.name ?? "—"}</p>
          <p><span className="font-medium">Email:</span> {session.user.email}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Comenzile mele</h2>
      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/comanda/${order.orderNumber}`}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(Number(order.total))}</p>
                <Badge variant="secondary" className="text-xs">{order.status}</Badge>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Nu ai nicio comandă încă.</p>
      )}
    </div>
  );
}
