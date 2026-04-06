import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Livrare și plată",
  description: "Informații despre opțiunile de livrare și metodele de plată disponibile pe JONO.",
};

export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Livrare și plată</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Livrare și plată</h1>

      <div className="max-w-3xl space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Opțiuni de livrare</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Livrare standard prin curier — 24-48 ore lucrătoare</li>
            <li>Livrare gratuită pentru comenzi peste 200 RON</li>
            <li>Cost livrare standard: 19,99 RON</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Metode de plată</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Card bancar (Visa, Mastercard)</li>
            <li>Ramburs la livrare (plata se face curierului)</li>
            <li>Transfer bancar</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
