"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrderStatusAction } from "@/lib/actions/order-admin";
import { toast } from "sonner";

type OrderStatus = "NEW" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "RETURNED";

const statusLabels: Record<string, string> = {
  NEW: "Nouă",
  CONFIRMED: "Confirmată",
  PROCESSING: "În procesare",
  SHIPPED: "Expediată",
  DELIVERED: "Livrată",
  COMPLETED: "Finalizată",
  RETURNED: "Returnată",
};

interface Props {
  orderId: string;
  currentStatus: string;
}

export function OrderStatusChanger({ orderId, currentStatus }: Props) {
  const router = useRouter();

  const handleChange = async (value: string | null) => {
    if (!value) return;
    const result = await updateOrderStatusAction(orderId, value as OrderStatus);
    if (result.success) {
      toast.success("Status actualizat");
      router.refresh();
    } else {
      toast.error(result.error ?? "Eroare");
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusLabels).map(([key, label]) => (
          <SelectItem key={key} value={key}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
