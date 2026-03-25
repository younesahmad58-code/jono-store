"use client";

import { Button } from "@/components/ui/button";
import { FileText, Truck, Phone, Receipt } from "lucide-react";
import { toast } from "sonner";

interface Props {
  orderId: string;
}

export function OrderActionButtons({ orderId }: Props) {
  const handleAction = (action: string) => {
    toast.info(`Funcționalitatea "${action}" va fi conectată la API-ul corespunzător.`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => handleAction("Generare AWB")}>
        <FileText className="h-4 w-4 mr-2" />
        Generează AWB
      </Button>
      <Button variant="outline" onClick={() => handleAction("Cheamă curier")}>
        <Truck className="h-4 w-4 mr-2" />
        Cheamă curier
      </Button>
      <Button variant="outline" onClick={() => handleAction("Emite factură")}>
        <Receipt className="h-4 w-4 mr-2" />
        Emite factură
      </Button>
      <Button variant="outline" onClick={() => handleAction("Factură proformă")}>
        <FileText className="h-4 w-4 mr-2" />
        Factură proformă PDF
      </Button>
    </div>
  );
}
