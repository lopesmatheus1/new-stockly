"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  ClipboardCopy,
  ClipboardPen,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import DeleteProductAlert from "./delete-product";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertDialogContent from "./upsert-dialog-conent";
import { useState } from "react";
import { FormatCurrency } from "@/app/_helpers/currency";
import { ProductsDto } from "@/app/_data-access/products/get-products";
import StockStatusBadge from "@/app/_components/stock-status-badge";

export const productTableColumns: ColumnDef<ProductsDto>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const price = row.row.original.price;
      return <p>{FormatCurrency(Number(price))}</p>;
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      return <StockStatusBadge status={product.status} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      const [dialogIsOpen, setDialogIsOpen] = useState(false);
      return (
        <AlertDialog>
          <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopy /> Copiar ID
                </DropdownMenuItem>

                <DialogTrigger>
                  <DropdownMenuItem>
                    <ClipboardPen /> Editar
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger>
                  <DropdownMenuItem>
                    <TrashIcon /> Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>

              <UpsertDialogContent
                defaultValues={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  stock: product.stock,
                }}
                setDialogIsOpen={setDialogIsOpen}
              />
              <DeleteProductAlert productId={product.id} />
            </DropdownMenu>
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
