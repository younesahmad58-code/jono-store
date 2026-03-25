"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/order";
import { placeOrderAction } from "@/lib/actions/order";
import { useCart } from "@/lib/cart";
import { ROMANIAN_COUNTIES } from "@/lib/constants/counties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const shippingCost = subtotal >= 200 ? 0 : 19.99;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      isBusiness: false,
      shippingMethod: "standard",
      paymentMethod: "COD",
    },
  });

  const isBusiness = watch("isBusiness");

  const onSubmit = async (data: CheckoutInput) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.set(key, String(value));
      }
    });

    const cartItems = items.map((i) => ({
      id: i.id,
      name: i.name,
      sku: i.sku,
      ean: null,
      price: i.price,
      salePrice: i.salePrice,
      quantity: i.quantity,
    }));

    const result = await placeOrderAction(formData, cartItems, subtotal, shippingCost);

    if (result.success && result.orderNumber) {
      clearCart();
      toast.success("Comanda a fost plasată cu succes!");
      router.push(`/comanda/${result.orderNumber}`);
    } else {
      toast.error(result.error ?? "Eroare la plasarea comenzii");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Date de livrare</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nume complet *</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Adresă completă *</Label>
          <Input id="street" placeholder="Strada, număr, bloc, scara, apart." {...register("street")} />
          {errors.street && <p className="text-sm text-destructive">{errors.street.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Oraș *</Label>
            <Input id="city" {...register("city")} />
            {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Județ *</Label>
            <Select onValueChange={(v) => { if (v) setValue("county", v); }} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Selectează" />
              </SelectTrigger>
              <SelectContent>
                {ROMANIAN_COUNTIES.map((county) => (
                  <SelectItem key={county} value={county}>{county}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.county && <p className="text-sm text-destructive">{errors.county.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Cod poștal *</Label>
            <Input id="postalCode" {...register("postalCode")} />
            {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.message}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch
            checked={isBusiness}
            onCheckedChange={(checked) => setValue("isBusiness", checked)}
          />
          <Label>Facturare pe firmă</Label>
        </div>

        {isBusiness && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label htmlFor="companyName">Denumire firmă *</Label>
              <Input id="companyName" {...register("companyName")} />
              {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cui">CUI *</Label>
              <Input id="cui" {...register("cui")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regCom">Nr. Reg. Com.</Label>
              <Input id="regCom" {...register("regCom")} />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Metoda de livrare</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input type="radio" value="standard" {...register("shippingMethod")} defaultChecked />
            <div>
              <p className="font-medium">Curier standard</p>
              <p className="text-sm text-muted-foreground">Livrare în 2-3 zile lucrătoare</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input type="radio" value="express" {...register("shippingMethod")} />
            <div>
              <p className="font-medium">Curier express</p>
              <p className="text-sm text-muted-foreground">Livrare în 24h (disponibil în București)</p>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Metoda de plată</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input type="radio" value="COD" {...register("paymentMethod")} defaultChecked />
            <div>
              <p className="font-medium">Ramburs (plata la livrare)</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input type="radio" value="CARD" {...register("paymentMethod")} />
            <div>
              <p className="font-medium">Card bancar</p>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observații (opțional)</Label>
        <Textarea id="notes" placeholder="Instrucțiuni speciale de livrare..." {...register("notes")} />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading || items.length === 0}>
        {loading ? "Se procesează..." : "Plasează comanda"}
      </Button>
    </form>
  );
}
