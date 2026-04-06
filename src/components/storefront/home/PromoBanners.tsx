import Link from "next/link";
import { Tag, Truck } from "lucide-react";

export function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/categorii?filter=promotii"
          className="group bg-secondary p-8 md:p-10 flex flex-col justify-center hover:bg-secondary/90 transition-colors"
        >
          <Tag className="h-8 w-8 text-primary mb-3" />
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Prețuri imbatabile
          </h3>
          <p className="text-primary/70 text-sm mb-4 max-w-xs">
            Reduceri la sute de produse. Oferte actualizate în fiecare săptămână.
          </p>
          <span className="text-sm font-semibold text-primary group-hover:text-white transition-colors inline-flex items-center gap-1">
            Vezi toate ofertele &rarr;
          </span>
        </Link>

        <Link
          href="/contact"
          className="group bg-primary p-8 md:p-10 flex flex-col justify-center hover:bg-primary/90 transition-colors"
        >
          <Truck className="h-8 w-8 text-secondary mb-3" />
          <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2">
            Transport gratuit
          </h3>
          <p className="text-secondary/60 text-sm mb-4 max-w-xs">
            Livrare gratuită pentru comenzi peste 200 lei. Livrare în 2-4 zile lucrătoare în toată România.
          </p>
          <span className="text-sm font-semibold text-secondary group-hover:text-secondary/80 transition-colors inline-flex items-center gap-1">
            Află mai multe &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
