import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopy,
  ClipboardPen,
  TrashIcon,
} from "lucide-react";

import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSheetContent from "./upsert-sheet-content";
import { deleteSale } from "@/app/_actions/sales/delete-sale";
import { useToast } from "@/app/_hooks/use-toast";
import { flattenValidationErrors } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductsDto } from "@/app/_data-access/products/get-products";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

interface SalesTableDropdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProduct">;
  productOptions: ComboboxOption[];
  products: ProductsDto[];
}

const SalesTableDropdownMenu = ({
  sale,
  products,
  productOptions,
}: SalesTableDropdownMenuProps) => {
  const { toast } = useToast();
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);

  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onError: ({ error: { serverError, validationErrors } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast({
        variant: "destructive",
        description: serverError ?? flattenedErrors.formErrors[0],
      });
    },
    onSuccess: () => {
      toast({ description: "Venda deletada com sucesso" });
    },
  });

  const onDeleteClick = () => {
    executeDeleteSale({ id: sale.id });
  };
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(sale.id)}
            >
              <ClipboardCopy /> Copiar ID
            </DropdownMenuItem>

            <SheetTrigger>
              <DropdownMenuItem>
                <ClipboardPen /> Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger>
              <DropdownMenuItem>
                <TrashIcon /> Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a deletar esse produto. Esta ação não pode ser
                desfeita, deseja continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteClick}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </DropdownMenu>
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
        productOptions={productOptions}
        products={products}
        defaultSelectedProducts={sale.saleProduct.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          price: Number(saleProduct.unitPrice),
          name: saleProduct.productName,
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropdownMenu;
