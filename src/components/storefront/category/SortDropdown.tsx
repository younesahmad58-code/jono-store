"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "createdAt-desc", label: "Cele mai noi" },
  { value: "price-asc", label: "Preț crescător" },
  { value: "price-desc", label: "Preț descrescător" },
  { value: "name-asc", label: "Nume A-Z" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = `${searchParams.get("sortBy") || "createdAt"}-${searchParams.get("sortOrder") || "desc"}`;

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const [sortBy, sortOrder] = value.split("-");
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative inline-block">
      <select
        value={currentSort}
        onChange={handleSort}
        className="h-9 pl-3 pr-9 border border-border bg-white text-sm rounded-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
