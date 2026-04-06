import Link from "next/link";
import { Package, Handshake, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

export function WholesaleCTA() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Soluții pentru afacerea ta
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="border border-white/20 p-8 flex flex-col items-center text-center">
            <Package className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Prețuri speciale en-gros</h3>
            <p className="text-primary/70 text-sm mb-6 leading-relaxed">
              Reduceri semnificative pentru comenzi în cantități mari. Ideal pentru
              hoteluri, birouri și restaurante.
            </p>
            <Link
              href="mailto:contact@jono.ro"
              className={buttonVariants({ size: "lg", variant: "default", className: "rounded-none font-semibold bg-primary text-secondary hover:bg-primary/90" })}
            >
              Solicită ofertă
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="border border-white/20 p-8 flex flex-col items-center text-center">
            <Handshake className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Devino partener JONO</h3>
            <p className="text-primary/70 text-sm mb-6 leading-relaxed">
              Construiește un parteneriat de lungă durată cu beneficii exclusive
              și acces prioritar la produse noi.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg", variant: "default", className: "rounded-none font-semibold bg-primary text-secondary hover:bg-primary/90" })}
            >
              Contactează-ne
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
