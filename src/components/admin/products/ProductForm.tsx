"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductInput } from "@/lib/validations/product";
import { createProductAction, updateProductAction } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUploader } from "./ImageUploader";
import { CategoryTreeSelector } from "./CategoryTreeSelector";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

interface ImageItem {
  url: string;
  alt: string;
}

interface Category {
  id: string;
  name: string;
  children: { id: string; name: string }[];
}

interface ProductFormProps {
  categories: Category[];
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    salePrice: number | null;
    sku: string;
    ean: string | null;
    stock: number;
    weight: number | null;
    status: string;
    categoryId: string;
    images: ImageItem[];
  };
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(product?.description ?? "");
  const [images, setImages] = useState<ImageItem[]>(product?.images ?? []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      price: product?.price ?? 0,
      salePrice: product?.salePrice ?? undefined,
      sku: product?.sku ?? "",
      ean: product?.ean ?? "",
      stock: product?.stock ?? 0,
      weight: product?.weight ?? undefined,
      status: (product?.status as "DRAFT" | "PUBLISHED" | "HIDDEN") ?? "DRAFT",
      categoryId: product?.categoryId ?? "",
    },
  });

  const name = watch("name");

  const handleAutoSlug = () => {
    if (name) setValue("slug", slugify(name));
  };

  const onSubmit = async (data: ProductInput, status?: string) => {
    setLoading(true);
    const finalData = { ...data, status: (status ?? data.status) as "DRAFT" | "PUBLISHED" | "HIDDEN" };
    const formData = new FormData();
    Object.entries(finalData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.set(key, String(value));
    });
    formData.set("description", description);
    images.forEach((img) => {
      formData.append("imageUrls", img.url);
      formData.append("imageAlts", img.alt);
    });

    const result = product
      ? await updateProductAction(product.id, formData)
      : await createProductAction(formData);

    if (result.success) {
      toast.success(product ? "Produs actualizat" : "Produs creat");
      router.push("/admin/produse");
      router.refresh();
    } else {
      toast.error(result.error ?? "Eroare la salvare");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Informații generale</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Nume produs</Label>
              <Input id="name" {...register("name")} onBlur={handleAutoSlug} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Descriere</Label>
              <RichTextEditor content={description} onChange={setDescription} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Imagini</h2>
            <ImageUploader images={images} onChange={setImages} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Preț și stoc</h2>
            <div className="space-y-2">
              <Label htmlFor="price">Preț (RON)</Label>
              <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Preț redus (RON)</Label>
              <Input id="salePrice" type="number" step="0.01" {...register("salePrice", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stoc</Label>
              <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Greutate (kg)</Label>
              <Input id="weight" type="number" step="0.001" {...register("weight", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Identificare</h2>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" {...register("sku")} />
              {errors.sku && <p className="text-sm text-destructive">{errors.sku.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ean">EAN</Label>
              <Input id="ean" {...register("ean")} />
            </div>
          </div>

          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Categorie</h2>
            <CategoryTreeSelector
              categories={categories}
              value={watch("categoryId")}
              onChange={(id) => setValue("categoryId", id)}
            />
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
          </div>

          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="font-semibold">Status</h2>
            <Select
              value={watch("status")}
              onValueChange={(v) => { if (v) setValue("status", v as "DRAFT" | "PUBLISHED" | "HIDDEN"); }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Publicat</SelectItem>
                <SelectItem value="HIDDEN">Ascuns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleSubmit((data) => onSubmit(data, "DRAFT"))}
        >
          Salvează ca draft
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Se salvează..." : product ? "Actualizează" : "Publică"}
        </Button>
      </div>
    </form>
  );
}
