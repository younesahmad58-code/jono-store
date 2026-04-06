"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Page error:", error);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-destructive mb-4">Eroare</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        A apărut o eroare neașteptată. Te rugăm să încerci din nou.
      </p>
      <Button onClick={reset}>Încearcă din nou</Button>
    </div>
  );
}
