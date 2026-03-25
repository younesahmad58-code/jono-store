import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Despre noi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Despre AramSweet</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Echipa noastră</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cariere</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Informații</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Livrare și plată</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Politica de retur</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Termeni și condiții</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Politica de confidențialitate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contul meu</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Autentificare</Link></li>
              <li><Link href="/inregistrare" className="hover:text-white transition-colors">Înregistrare</Link></li>
              <li><Link href="/cont" className="hover:text-white transition-colors">Comenzile mele</Link></li>
              <li><Link href="/cos" className="hover:text-white transition-colors">Coș de cumpărături</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>+40 721 123 456</li>
              <li>contact@aramsweet.ro</li>
              <li>Str. Dulciurilor nr. 10</li>
              <li>București, România</li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} AramSweet. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
