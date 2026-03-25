import { prisma } from "@/lib/db";

export async function getParentCategories() {
  return prisma.category.findMany({
    where: { parentId: null, isActive: true },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      parent: true,
    },
  });
}

export async function getCategoryTree() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { products: true } } },
      },
      _count: { select: { products: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      parent: true,
      _count: { select: { products: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
}
