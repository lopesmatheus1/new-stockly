"use client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "../../_components/ui/button";
import { Sheet, SheetTrigger } from "../../_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { useState } from "react";

interface SheetSaleButtonProps {
  productOptions: ComboboxOption[];
  products: Product[];
}

const SheetSaleButton = ({
  productOptions,
  products,
}: SheetSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova venda</Button>
      </SheetTrigger>
      <UpsertSheetContent
        onSubmitSuccess={() => setSheetIsOpen(false)}
        products={products}
        productOptions={productOptions}
      />
    </Sheet>
  );
};

export default SheetSaleButton;
