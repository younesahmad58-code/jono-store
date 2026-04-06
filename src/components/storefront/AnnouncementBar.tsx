"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

const STORAGE_KEY = "jono-announcement-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div className="bg-secondary text-secondary-foreground text-xs sm:text-sm py-2 px-4 relative text-center">
      <span>
        Transport Gratuit pentru comenzi peste{" "}
        <strong>{FREE_SHIPPING_THRESHOLD} RON</strong>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Închide"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
