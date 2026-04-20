"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";

interface Slide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

const MAIN_SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=600&fit=crop",
    alt: "Produse pentru casa ta",
    title: "Descoperă produse de calitate la prețuri speciale",
    subtitle: "Tot ce ai nevoie, într-un singur loc — rapid, simplu și sigur",
    ctaText: "Descoperă colecția",
    ctaHref: "/categorii/mobilier",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=600&fit=crop",
    alt: "Colecție nouă de sezon",
    title: "Colecția nouă de sezon",
    subtitle: "Noutăți în fiecare săptămână — fii primul care descoperă",
    ctaText: "Vezi noutățile",
    ctaHref: "/categorii?filter=trending",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=600&fit=crop",
    alt: "Oferte speciale",
    title: "Oferte speciale — până la 40% reducere",
    subtitle: "Profită de prețuri reduse la produsele tale preferate",
    ctaText: "Vezi ofertele",
    ctaHref: "/categorii?filter=promotii",
  },
];

const PETS_SLIDES: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&h=600&fit=crop",
    alt: "Produse pentru animalul tău",
    title: "Tot ce are nevoie animalul tău de companie",
    subtitle: "Hrană, accesorii și jucării de calitate",
    ctaText: "Descoperă produsele",
    ctaHref: "/pets/categorii",
  },
  {
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1920&h=600&fit=crop",
    alt: "Hrană și accesorii pets",
    title: "Hrană premium pentru blănoșii tăi",
    subtitle: "Sortimente variate pentru câini și pisici",
    ctaText: "Vezi selecția",
    ctaHref: "/pets/categorii?filter=bestseller",
  },
  {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&h=600&fit=crop",
    alt: "Oferte pets",
    title: "Oferte speciale pentru pets",
    subtitle: "Reduceri la cele mai populare produse",
    ctaText: "Vezi ofertele",
    ctaHref: "/pets/categorii?filter=promotii",
  },
];

interface HeroBannerProps {
  variant?: "main" | "pets";
}

export function HeroBanner({ variant = "main" }: HeroBannerProps) {
  const slides = variant === "pets" ? PETS_SLIDES : MAIN_SLIDES;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="group/banner relative w-full overflow-hidden bg-muted">
      <div className="relative aspect-[16/9] sm:aspect-[16/9] lg:aspect-[2/1]">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <h2
                    className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-white/90 text-sm sm:text-base md:text-lg mb-4 md:mb-6 line-clamp-2"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.ctaHref}
                    className={buttonVariants({ size: "lg", variant: "secondary", className: "rounded-none" })}
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/15 border border-white/30 hover:bg-white/25 p-2.5 rounded-full transition-all opacity-0 group-hover/banner:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/15 border border-white/30 hover:bg-white/25 p-2.5 rounded-full transition-all opacity-0 group-hover/banner:opacity-100"
            aria-label="Următor"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 transition-colors ${
                  i === current ? "bg-secondary" : "bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
