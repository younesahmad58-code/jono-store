import { prisma } from "@/lib/db";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayOrders, todayRevenue, pendingOrders, lowStockCount] =
    await Promise.all([
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: today }, paymentStatus: "PAID" },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.product.count({
        where: { stock: { lte: LOW_STOCK_THRESHOLD }, status: "PUBLISHED" },
      }),
    ]);

  return {
    todayOrders,
    todayRevenue: todayRevenue._sum.total?.toNumber() ?? 0,
    pendingOrders,
    lowStockCount,
  };
}

export async function getRecentOrders(limit = 5) {
  return prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      shippingAddress: { select: { fullName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getLowStockProducts() {
  return prisma.product.findMany({
    where: { stock: { lte: LOW_STOCK_THRESHOLD }, status: "PUBLISHED" },
    orderBy: { stock: "asc" },
    take: 10,
  });
}

export async function getOrdersChartData() {
  const days = 7;
  const data: { date: string; orders: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = await prisma.order.count({
      where: { createdAt: { gte: date, lt: nextDay } },
    });

    data.push({
      date: date.toLocaleDateString("ro-RO", { weekday: "short", day: "numeric" }),
      orders: count,
    });
  }

  return data;
}
