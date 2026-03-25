import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StatCardsProps {
  stats: {
    todayOrders: number;
    todayRevenue: number;
    pendingOrders: number;
    lowStockCount: number;
  };
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    { label: "Comenzi azi", value: String(stats.todayOrders), icon: ShoppingCart, color: "text-blue-600" },
    { label: "Venituri azi", value: formatPrice(stats.todayRevenue), icon: DollarSign, color: "text-green-600" },
    { label: "Comenzi noi", value: String(stats.pendingOrders), icon: Clock, color: "text-amber-600" },
    { label: "Stoc scăzut", value: String(stats.lowStockCount), icon: AlertTriangle, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
