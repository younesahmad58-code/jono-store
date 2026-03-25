import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

export function WholesaleCTA() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Comenzi en-gros? Contactează-ne!
        </h2>
        <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
          Oferim prețuri speciale pentru comenzi în cantități mari. Ideal pentru
          restaurante, cafenele, hoteluri și evenimente corporate.
        </p>
        <Link href="mailto:contact@aramsweet.ro" className={buttonVariants({ size: "lg", variant: "secondary" })}>Solicită o ofertă</Link>
      </div>
    </section>
  );
}
