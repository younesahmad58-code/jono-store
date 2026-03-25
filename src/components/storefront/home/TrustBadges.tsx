import { Truck, Headphones, ShieldCheck, RotateCcw } from "lucide-react";

const badges = [
  { icon: Truck, label: "Livrare rapidă", sublabel: "în 24-48h" },
  { icon: Headphones, label: "Suport client", sublabel: "Lun-Vin 9-18" },
  { icon: ShieldCheck, label: "Plăți securizate", sublabel: "Card sau ramburs" },
  { icon: RotateCcw, label: "Retur gratuit", sublabel: "în 14 zile" },
];

export function TrustBadges() {
  return (
    <section className="bg-muted/50 border-y">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 justify-center">
              <badge.icon className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
