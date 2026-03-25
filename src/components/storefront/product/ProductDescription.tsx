import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDescriptionProps {
  description: string | null;
  weight: number | null;
  sku: string;
  ean: string | null;
}

export function ProductDescription({ description, weight, sku, ean }: ProductDescriptionProps) {
  return (
    <Tabs defaultValue="description" className="mt-8">
      <TabsList>
        <TabsTrigger value="description">Descriere</TabsTrigger>
        <TabsTrigger value="specs">Specificații</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4">
        {description ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-muted-foreground">Nu există descriere disponibilă.</p>
        )}
      </TabsContent>

      <TabsContent value="specs" className="mt-4">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-40">SKU</td>
              <td className="py-2">{sku}</td>
            </tr>
            {ean && (
              <tr className="border-b">
                <td className="py-2 font-medium">EAN</td>
                <td className="py-2">{ean}</td>
              </tr>
            )}
            {weight && (
              <tr className="border-b">
                <td className="py-2 font-medium">Greutate</td>
                <td className="py-2">{(weight * 1000).toFixed(0)}g</td>
              </tr>
            )}
          </tbody>
        </table>
      </TabsContent>
    </Tabs>
  );
}
