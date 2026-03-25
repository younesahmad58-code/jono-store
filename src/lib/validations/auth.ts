import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Adresa de email invalidă"),
  password: z.string().min(6, "Parola trebuie să aibă minim 6 caractere"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
    email: z.string().email("Adresa de email invalidă"),
    password: z.string().min(6, "Parola trebuie să aibă minim 6 caractere"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolele nu coincid",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
