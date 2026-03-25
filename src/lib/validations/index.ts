export { loginSchema, registerSchema } from "./auth";
export type { LoginInput, RegisterInput } from "./auth";

export { productSchema } from "./product";
export type { ProductInput } from "./product";

export { categorySchema } from "./category";
export type { CategoryInput } from "./category";

export { checkoutSchema } from "./order";
export type { CheckoutInput } from "./order";

export {
  storeSettingsSchema,
  shippingSettingsSchema,
} from "./settings";
export type {
  StoreSettingsInput,
  ShippingSettingsInput,
} from "./settings";
