"use client";

import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Mail, MessageCircle } from "lucide-react";

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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col items-end gap-2">
          <a
            href="https://wa.me/40721123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white border border-border shadow-md px-4 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            <MessageCircle className="h-4 w-4 flex-shrink-0" />
            WhatsApp
          </a>
          <a
            href="mailto:contact@jono.ro"
            className="flex items-center gap-2 bg-white border border-border shadow-md px-4 py-2.5 text-sm font-medium text-secondary hover:bg-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            contact@jono.ro
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-secondary text-white w-12 h-12 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Contact"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}
