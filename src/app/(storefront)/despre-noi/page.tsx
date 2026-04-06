import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre JONO",
  description: "Află mai multe despre JONO — magazinul tău online cu produse de calitate.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Despre JONO</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Despre JONO</h1>

      <div className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          JONO este destinația ta online pentru produse de calitate superioară la prețuri corecte.
          Ne propunem să oferim o experiență de cumpărături simplă, rapidă și plăcută.
        </p>
        <p>
          Cu o selecție atentă de produse de la furnizori de încredere, JONO îți pune la dispoziție
          tot ce ai nevoie — de la articole pentru casă și grădină, până la produse pentru
          animalele de companie.
        </p>
        <p>
          Suntem aici să te ajutăm cu produse de calitate, livrare rapidă și un serviciu de
          suport dedicat. Satisfacția ta este prioritatea noastră.
        </p>
      </div>
    </div>
  );
}
