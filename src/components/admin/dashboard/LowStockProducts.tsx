import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LowStockProductsProps {
  products: { id: string; name: string; sku: string; stock: number }[];
}

export function LowStockProducts({ products }: LowStockProductsProps) {
  if (products.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Produse cu stoc scăzut</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produs</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stoc</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.sku}</TableCell>
                <TableCell>
                  <Badge variant={p.stock === 0 ? "destructive" : "secondary"}>
                    {p.stock} buc.
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/produse/${p.id}`} className="text-sm text-primary hover:underline">
                    Editează
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
