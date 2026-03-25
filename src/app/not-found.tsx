import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Pagina nu a fost găsită</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
      </p>
      <Link href="/" className={buttonVariants()}>Înapoi la pagina principală</Link>
    </div>
  );
}
