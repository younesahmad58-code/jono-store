"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Home } from "lucide-react";

export function SiteToggle() {
  const pathname = usePathname();
  const isPets = pathname.startsWith("/pets");

  return (
    <div className="flex border border-border overflow-hidden text-xs sm:text-sm">
      <Link
        href="/"
        className={`flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors ${
          !isPets
            ? "bg-secondary text-secondary-foreground"
            : "bg-white text-foreground hover:bg-primary"
        }`}
      >
        <Home className="h-3.5 w-3.5" />
        JONO
      </Link>
      <Link
        href="/pets"
        className={`flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors ${
          isPets
            ? "bg-secondary text-secondary-foreground"
            : "bg-white text-foreground hover:bg-primary"
        }`}
      >
        <PawPrint className="h-3.5 w-3.5" />
        Pets
      </Link>
    </div>
  );
}
