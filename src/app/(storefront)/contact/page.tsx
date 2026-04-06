"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      toast.error("Te rugăm să completezi toate câmpurile.");
      return;
    }

    setSending(true);
    setTimeout(() => {
      toast.success("Mesajul a fost trimis cu succes! Te vom contacta în cel mai scurt timp.");
      form.reset();
      setSending(false);
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Acasă</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Contact</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Ai întrebări sau ai nevoie de ajutor? Nu ezita să ne contactezi — echipa noastră
            îți stă la dispoziție.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Telefon</p>
                <p className="text-sm text-muted-foreground">+40 721 123 456</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contact@jono.ro</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Adresă</p>
                <p className="text-sm text-muted-foreground">Str. Exemplu nr. 10, București, România</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Program</p>
                <p className="text-sm text-muted-foreground">Luni — Vineri: 9:00 — 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Trimite-ne un mesaj</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nume</label>
              <input id="name" name="name" type="text" required className="w-full h-10 px-3 border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full h-10 px-3 border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Mesaj</label>
              <textarea id="message" name="message" rows={4} required className="w-full px-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full h-10 bg-secondary text-white text-sm font-medium rounded-sm hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              {sending ? "Se trimite..." : "Trimite mesajul"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
