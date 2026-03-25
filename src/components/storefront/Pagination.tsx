"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  const pages: number[] = [];
  const delta = 2;
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8">
      {currentPage <= 1 ? (
        <span className={cn(buttonVariants({ variant: "outline", size: "icon" }), "pointer-events-none opacity-50")}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      ) : (
        <Link href={buildUrl(currentPage - 1)} className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pages[0] > 1 && (
        <>
          <Link href={buildUrl(1)} className={buttonVariants({ variant: "outline", size: "sm" })}>
            1
          </Link>
          {pages[0] > 2 && <span className="px-2 text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildUrl(page)}
          className={buttonVariants({ variant: page === currentPage ? "default" : "outline", size: "sm" })}
        >
          {page}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-muted-foreground">...</span>
          )}
          <Link href={buildUrl(totalPages)} className={buttonVariants({ variant: "outline", size: "sm" })}>
            {totalPages}
          </Link>
        </>
      )}

      {currentPage >= totalPages ? (
        <span className={cn(buttonVariants({ variant: "outline", size: "icon" }), "pointer-events-none opacity-50")}>
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : (
        <Link href={buildUrl(currentPage + 1)} className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
