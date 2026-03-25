"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettingsAction } from "@/lib/actions/settings";
import { toast } from "sonner";

interface Props {
  settings: Record<string, string>;
}

export function StoreInfoForm({ settings }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    storeName: settings.storeName ?? "",
    storePhone: settings.storePhone ?? "",
    storeEmail: settings.storeEmail ?? "",
    storeAddress: settings.storeAddress ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const entries = Object.entries(form).map(([key, value]) => ({
      key,
      value,
      group: "store",
    }));

    const result = await updateSettingsAction(entries);
    if (result.success) {
      toast.success("Setări salvate");
    } else {
      toast.error(result.error ?? "Eroare");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 space-y-4">
      <h2 className="font-semibold">Informații magazin</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Denumire magazin</Label>
          <Input value={form.storeName} onChange={(e) => setForm((f) => ({ ...f, storeName: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Telefon</Label>
          <Input value={form.storePhone} onChange={(e) => setForm((f) => ({ ...f, storePhone: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={form.storeEmail} onChange={(e) => setForm((f) => ({ ...f, storeEmail: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Adresă</Label>
          <Input value={form.storeAddress} onChange={(e) => setForm((f) => ({ ...f, storeAddress: e.target.value }))} />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Se salvează..." : "Salvează"}
      </Button>
    </form>
  );
}
