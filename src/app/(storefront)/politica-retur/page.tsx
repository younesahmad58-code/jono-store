import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de retur",
  description: "Informații despre politica de returnare a produselor cumpărate de pe JONO.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Politica de retur</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Politica de retur</h1>

      <div className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Ai dreptul de a returna produsele cumpărate de pe JONO în termen de 14 zile
          calendaristice de la data primirii coletului, fără a invoca vreun motiv.
        </p>
        <p>
          Produsele trebuie returnate în ambalajul original, nefolosite și fără urme de uzură.
          Costul returnării este suportat de client, cu excepția cazurilor în care produsul
          prezintă defecte de fabricație.
        </p>
        <p>
          Rambursarea se face în termen de 14 zile de la primirea produsului returnat,
          folosind aceeași metodă de plată utilizată la achiziție.
        </p>
      </div>
    </div>
  );
}
