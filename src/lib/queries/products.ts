import { prisma } from "@/lib/db";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { ProductStatus } from "@/generated/prisma/client";

interface ProductFilters {
  categoryId?: string;
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  status?: ProductStatus;
  search?: string;
}

interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function getNewProducts(limit = 10) {
  return prisma.product.findMany({
    where: { status: "PUBLISHED" },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getProductsOnSale(limit = 10) {
  return prisma.product.findMany({
    where: { status: "PUBLISHED", salePrice: { not: null } },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: { include: { parent: true } },
    },
  });
}

export async function getProductsByCategory(
  filters: ProductFilters,
  pagination: PaginationParams = {}
) {
  const { page = 1, perPage = ITEMS_PER_PAGE, sortBy = "createdAt", sortOrder = "desc" } = pagination;

  const where: Record<string, unknown> = { status: filters.status || "PUBLISHED" };

  if (filters.categoryIds?.length) {
    where.categoryId = { in: filters.categoryIds };
  } else if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) (where.price as Record<string, number>).gte = filters.minPrice;
    if (filters.maxPrice) (where.price as Record<string, number>).lte = filters.maxPrice;
  }

  if (filters.inStock) {
    where.stock = { gt: 0 };
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const orderBy = sortBy === "price"
    ? { price: sortOrder }
    : sortBy === "name"
      ? { name: sortOrder }
      : { createdAt: sortOrder };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    totalPages: Math.ceil(total / perPage),
    currentPage: page,
  };
}

export async function getSimilarProducts(categoryId: string, excludeId: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      status: "PUBLISHED",
    },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, category: true },
    take: limit,
  });
}

export async function searchProducts(query: string, page = 1) {
  return getProductsByCategory({ search: query }, { page });
}
