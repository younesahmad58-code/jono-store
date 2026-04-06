import Link from "next/link";
import Image from "next/image";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

interface CategoryGridProps {
  categories: CategoryItem[];
  pathPrefix?: string;
}

const categoryImages: Record<string, string> = {
  "mobilier": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
  "decoratiuni": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
  "iluminat": "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop",
  "textile": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=600&fit=crop",
  "organizare": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=600&fit=crop",
  "caini": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=600&fit=crop",
  "pisici": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop",
  "hrana-animale": "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=600&h=600&fit=crop",
  "accesorii-animale": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=600&fit=crop",
};

export function CategoryGrid({ categories, pathPrefix = "" }: CategoryGridProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Explorează categoriile</h2>
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const imgSrc = categoryImages[cat.slug] || cat.imageUrl || `https://picsum.photos/seed/${cat.slug}/600/600`;
          return (
            <Link
              key={cat.id}
              href={`${pathPrefix}/categorii/${cat.slug}`}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={imgSrc}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/60 transition-colors" />
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <span className="text-white font-bold text-lg md:text-xl text-center px-2 group-hover:scale-105 transition-transform">
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
