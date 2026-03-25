"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: { id: string; url: string; alt: string }[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  const displayImages = images.length > 0
    ? images
    : [{ id: "placeholder", url: `https://picsum.photos/seed/placeholder/800/800`, alt: productName }];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-lg overflow-hidden border">
        <Image
          src={displayImages[selected].url}
          alt={displayImages[selected].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={cn(
                "relative w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-colors",
                i === selected ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
