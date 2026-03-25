import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-amber-900 to-amber-700 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Dulciuri Artizanale
            <br />
            pentru Momente Speciale
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Descoperă colecția noastră de prăjituri, torturi și deserturi
            preparate cu ingrediente naturale și multă pasiune.
          </p>
          <div className="flex gap-3">
            <Link href="/categorii/prajituri" className={buttonVariants({ size: "lg", className: "bg-white text-amber-900 hover:bg-white/90" })}>Vezi Produsele</Link>
            <Link href="/categorii/torturi" className={buttonVariants({ size: "lg", variant: "outline", className: "border-white text-white hover:bg-white/10" })}>Torturi la Comandă</Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero-sweets/1920/600')] bg-cover bg-center opacity-20" />
    </section>
  );
}
