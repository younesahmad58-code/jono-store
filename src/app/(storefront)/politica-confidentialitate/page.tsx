import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description: "Politica de confidențialitate și protecția datelor personale pe JONO.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Politica de confidențialitate</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Politica de confidențialitate</h1>

      <div className="max-w-3xl space-y-4 text-muted-foreground">
        <p>
          JONO respectă confidențialitatea datelor tale personale și se angajează să le
          protejeze în conformitate cu legislația în vigoare (GDPR).
        </p>
        <p>
          Datele personale colectate (nume, adresă, email, telefon) sunt utilizate exclusiv
          pentru procesarea comenzilor, livrarea produselor și comunicarea cu clienții.
        </p>
        <p>
          Nu transmitem datele tale personale către terți, cu excepția firmelor de curierat
          necesare pentru livrarea comenzilor.
        </p>
        <p>
          Ai dreptul de a solicita accesul, rectificarea sau ștergerea datelor tale personale
          contactându-ne la adresa de email: contact@jono.ro.
        </p>
      </div>
    </div>
  );
}
