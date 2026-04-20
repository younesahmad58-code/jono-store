import { headers } from "next/headers";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/storefront/cart";
import { FloatingContact } from "@/components/storefront/FloatingContact";

export const dynamic = "force-dynamic";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const mode = pathname.startsWith("/pets") ? "pets" : "main";

  return (
    <CartProvider>
      <AnnouncementBar />
      <Header mode={mode} pathname={pathname} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingContact />
    </CartProvider>
  );
}
