import { z } from "zod";

export const checkoutSchema = z
  .object({
    fullName: z.string().min(3, "Numele complet este obligatoriu"),
    phone: z.string().min(10, "Numărul de telefon este obligatoriu"),
    email: z.string().email("Adresa de email invalidă"),
    street: z.string().min(3, "Adresa este obligatorie"),
    city: z.string().min(2, "Orașul este obligatoriu"),
    county: z.string().min(2, "Județul este obligatoriu"),
    postalCode: z.string().min(5, "Codul poștal este obligatoriu"),
    isBusiness: z.boolean(),
    companyName: z.string().optional().nullable(),
    cui: z.string().optional().nullable(),
    regCom: z.string().optional().nullable(),
    shippingMethod: z.string().min(1, "Selectează metoda de livrare"),
    paymentMethod: z.enum(["CARD", "COD"], {
      message: "Selectează metoda de plată",
    }),
    notes: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.isBusiness) {
        return !!data.companyName && !!data.cui;
      }
      return true;
    },
    {
      message: "Completează datele firmei",
      path: ["companyName"],
    }
  );

export type CheckoutInput = z.infer<typeof checkoutSchema>;
