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

export function ShippingSettingsForm({ settings }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    freeShippingThreshold: settings.freeShippingThreshold ?? "200",
    standardShippingCost: settings.standardShippingCost ?? "19.99",
    senderName: settings.senderName ?? "",
    senderPhone: settings.senderPhone ?? "",
    senderAddress: settings.senderAddress ?? "",
    senderCity: settings.senderCity ?? "",
    senderCounty: settings.senderCounty ?? "",
    senderPostalCode: settings.senderPostalCode ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const entries = Object.entries(form).map(([key, value]) => ({
      key,
      value,
      group: "shipping",
    }));

    const result = await updateSettingsAction(entries);
    if (result.success) {
      toast.success("Setări salvate");
    } else {
      toast.error(result.error ?? "Eroare");
    }
    setLoading(false);
  };

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 space-y-4">
      <h2 className="font-semibold">Setări livrare</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Prag livrare gratuită (RON)</Label>
          <Input type="number" step="0.01" value={form.freeShippingThreshold} onChange={update("freeShippingThreshold")} />
        </div>
        <div className="space-y-2">
          <Label>Cost livrare standard (RON)</Label>
          <Input type="number" step="0.01" value={form.standardShippingCost} onChange={update("standardShippingCost")} />
        </div>
      </div>

      <h3 className="font-medium pt-4">Adresă expeditor</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nume expeditor</Label>
          <Input value={form.senderName} onChange={update("senderName")} />
        </div>
        <div className="space-y-2">
          <Label>Telefon</Label>
          <Input value={form.senderPhone} onChange={update("senderPhone")} />
        </div>
        <div className="space-y-2">
          <Label>Adresă</Label>
          <Input value={form.senderAddress} onChange={update("senderAddress")} />
        </div>
        <div className="space-y-2">
          <Label>Oraș</Label>
          <Input value={form.senderCity} onChange={update("senderCity")} />
        </div>
        <div className="space-y-2">
          <Label>Județ</Label>
          <Input value={form.senderCounty} onChange={update("senderCounty")} />
        </div>
        <div className="space-y-2">
          <Label>Cod poștal</Label>
          <Input value={form.senderPostalCode} onChange={update("senderPostalCode")} />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Se salvează..." : "Salvează"}
      </Button>
    </form>
  );
}
