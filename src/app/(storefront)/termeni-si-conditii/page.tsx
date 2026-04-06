import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii și condițiile de utilizare a site-ului JONO.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Termeni și condiții</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Termeni și condiții</h1>

      <div className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Utilizarea site-ului JONO implică acceptarea integrală și necondiționată a
          prezentilor termeni și condiții.
        </p>
        <p>
          Prețurile afișate pe site includ TVA și sunt exprimate în RON. Ne rezervăm dreptul
          de a modifica prețurile fără notificare prealabilă, însă prețul aplicat comenzii
          tale va fi cel din momentul plasării comenzii.
        </p>
        <p>
          Imaginile produselor au caracter informativ. Culorile reale pot diferi ușor față
          de cele afișate pe ecran, în funcție de setările monitorului.
        </p>
        <p>
          Pentru orice nelămuriri legate de termenii și condițiile noastre, vă rugăm
          să ne contactați la adresa contact@jono.ro.
        </p>
      </div>
    </div>
  );
}
