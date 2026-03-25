"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/category";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  productCount: number;
  children?: CategoryItem[];
}

interface Props {
  categories: CategoryItem[];
}

export function CategoryManager({ categories }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryItem | null>(null);
  const [parentId, setParentId] = useState<string>("");
  const [form, setForm] = useState({ name: "", slug: "", sortOrder: "0", isActive: "true" });
  const [loading, setLoading] = useState(false);

  const openCreate = (parent?: string) => {
    setEditing(null);
    setParentId(parent ?? "");
    setForm({ name: "", slug: "", sortOrder: "0", isActive: "true" });
    setModalOpen(true);
  };

  const openEdit = (cat: CategoryItem, parent?: string) => {
    setEditing(cat);
    setParentId(parent ?? "");
    setForm({ name: cat.name, slug: cat.slug, sortOrder: String(cat.sortOrder), isActive: String(cat.isActive) });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("slug", form.slug || slugify(form.name));
    formData.set("sortOrder", form.sortOrder);
    formData.set("isActive", form.isActive);
    if (parentId) formData.set("parentId", parentId);

    const result = editing
      ? await updateCategoryAction(editing.id, formData)
      : await createCategoryAction(formData);

    if (result.success) {
      toast.success(editing ? "Categorie actualizată" : "Categorie creată");
      setModalOpen(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Eroare");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Șterge categoria "${name}"?`)) return;
    const result = await deleteCategoryAction(id);
    if (result.success) {
      toast.success("Categorie ștearsă");
      router.refresh();
    } else {
      toast.error(result.error ?? "Eroare");
    }
  };

  return (
    <>
      <Button onClick={() => openCreate()}>
        <Plus className="h-4 w-4 mr-2" />Adaugă categorie
      </Button>

      <div className="border rounded-lg divide-y">
        {categories.map((parent) => (
          <div key={parent.id}>
            <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{parent.name}</span>
                <Badge variant="secondary" className="text-xs">{parent.productCount} produse</Badge>
                {!parent.isActive && <Badge variant="outline" className="text-xs">Inactiv</Badge>}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openCreate(parent.id)}>
                  <Plus className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEdit(parent)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(parent.id, parent.name)}>
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </div>
            {parent.children?.map((child) => (
              <div key={child.id} className="flex items-center justify-between px-4 py-2 pl-12 hover:bg-muted/50 bg-muted/20">
                <div className="flex items-center gap-3">
                  <span className="text-sm">{child.name}</span>
                  <Badge variant="secondary" className="text-xs">{child.productCount}</Badge>
                  {!child.isActive && <Badge variant="outline" className="text-xs">Inactiv</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(child, parent.id)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(child.id, child.name)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editează categorie" : "Adaugă categorie"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nume</Label>
              <Input
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Ordine sortare</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.isActive} onValueChange={(v) => setForm((f) => ({ ...f, isActive: v ?? f.isActive }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Activ</SelectItem>
                  <SelectItem value="false">Inactiv</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Anulează</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Se salvează..." : "Salvează"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
