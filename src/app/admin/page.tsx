import { getDashboardStats, getRecentOrders, getLowStockProducts, getOrdersChartData } from "@/lib/queries/admin";
import { StatCards } from "@/components/admin/dashboard/StatCards";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { LowStockProducts } from "@/components/admin/dashboard/LowStockProducts";
import { OrdersChart } from "@/components/admin/dashboard/OrdersChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, recentOrders, lowStock, chartData] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
    getLowStockProducts(),
    getOrdersChartData(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersChart data={chartData} />
        <RecentOrders orders={recentOrders.map((o) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          customerName: o.shippingAddress?.fullName ?? o.user?.name ?? "—",
          total: Number(o.total),
          status: o.status,
          createdAt: o.createdAt,
        }))} />
      </div>

      <LowStockProducts products={lowStock.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        stock: p.stock,
      }))} />
    </div>
  );
}
