import { Truck, Headphones, ShieldCheck, RotateCcw } from "lucide-react";

const badges = [
  { icon: Truck, label: "Livrare rapidă", sublabel: "în 24-48h" },
  { icon: Headphones, label: "Suport client", sublabel: "Lun-Vin 9-18" },
  { icon: ShieldCheck, label: "Plăți securizate", sublabel: "Card sau ramburs" },
  { icon: RotateCcw, label: "Retur gratuit", sublabel: "în 14 zile" },
];

export function TrustBadges() {
  return (
    <section className="bg-white border-y border-border">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 justify-center">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <badge.icon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-base">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
