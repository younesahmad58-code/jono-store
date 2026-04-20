"use client";

import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Mail } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.571a.75.75 0 0 0 .921.921l5.726-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 0 1-4.961-1.356l-.355-.211-3.697.949.967-3.595-.232-.369A9.71 9.71 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">
      {open && (
        <div className="flex flex-col items-end gap-2.5">
          <a
            href="https://wa.me/40721123456"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="bg-white/80 backdrop-blur-md text-secondary text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              WhatsApp
            </span>
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-[#25D366] text-white hover:opacity-90 transition-opacity">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
          </a>
          <a
            href="mailto:contact@jono.ro"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="bg-white/80 backdrop-blur-md text-secondary text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              Email
            </span>
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md bg-white/30 border border-white/40 text-secondary hover:bg-white/50 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md bg-white/30 border border-white/40 text-secondary hover:bg-white/50 transition-colors"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}
