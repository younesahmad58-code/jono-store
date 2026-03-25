import { getSiteSettings } from "@/lib/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreInfoForm } from "@/components/admin/settings/StoreInfoForm";
import { ShippingSettingsForm } from "@/components/admin/settings/ShippingSettingsForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Setări" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Setări</h1>

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store">Magazin</TabsTrigger>
          <TabsTrigger value="shipping">Livrare</TabsTrigger>
          <TabsTrigger value="billing">Facturare</TabsTrigger>
          <TabsTrigger value="courier">Curier</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <StoreInfoForm settings={settings} />
        </TabsContent>

        <TabsContent value="shipping">
          <ShippingSettingsForm settings={settings} />
        </TabsContent>

        <TabsContent value="billing">
          <div className="border rounded-lg p-6">
            <h2 className="font-semibold mb-4">Setări facturare</h2>
            <p className="text-muted-foreground text-sm">
              Configurarea integrării cu SmartBill/Oblio va fi disponibilă în curând.
              Completează cheile API și datele de facturare.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="courier">
          <div className="border rounded-lg p-6">
            <h2 className="font-semibold mb-4">Setări curier</h2>
            <p className="text-muted-foreground text-sm">
              Configurarea integrării cu servicii de curierat (FanCourier, Cargus, SameDay)
              va fi disponibilă în curând.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
