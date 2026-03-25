"use client";

import { useState } from "react";
import { deleteProductAction } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  productName: string;
}

export function DeleteProductButton({ productId, productName }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteProductAction(productId);
    if (result.success) {
      toast.success("Produsul a fost șters");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.error ?? "Eroare la ștergere");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-destructive hover:underline"
      >
        Șterge
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmare ștergere</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Ești sigur că vrei să ștergi produsul <strong>{productName}</strong>? Această acțiune este ireversibilă.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Anulează</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Se șterge..." : "Șterge"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
