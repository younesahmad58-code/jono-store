import { z } from "zod";

export const storeSettingsSchema = z.object({
  storeName: z.string().min(1, "Numele magazinului este obligatoriu"),
  storePhone: z.string().min(10, "Telefonul este obligatoriu"),
  storeEmail: z.string().email("Email invalid"),
  storeAddress: z.string().min(5, "Adresa este obligatorie"),
});

export const shippingSettingsSchema = z.object({
  freeShippingThreshold: z.coerce.number().min(0),
  standardShippingCost: z.coerce.number().min(0),
  senderName: z.string().min(1),
  senderPhone: z.string().min(10),
  senderAddress: z.string().min(5),
  senderCity: z.string().min(2),
  senderCounty: z.string().min(2),
  senderPostalCode: z.string().min(5),
});

export type StoreSettingsInput = z.infer<typeof storeSettingsSchema>;
export type ShippingSettingsInput = z.infer<typeof shippingSettingsSchema>;
