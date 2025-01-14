"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import { Circle } from "lucide-react";
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

const getStatusLabel = (stock: Product["stock"]) => {
  if (stock > 0) {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
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
      const label = getStatusLabel(product.stock);
      return (
        <Badge
          variant={`${label === "Fora de estoque" ? "destructive" : "outline"}`}
          className={`${label === "Fora de estoque" ? "bg-destructive/30 text-destructive hover:bg-destructive/10" : "bg-primary/30 text-primary hover:bg-primary/10"} gap-1`}
        >
          <Circle
            size={12}
            className={`${label === "Fora de estoque" ? "fill-destructive" : "fill-primary"}`}
            stroke="none"
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                <ClipboardCopy /> Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardPen /> Editar
              </DropdownMenuItem>

              <AlertDialogTrigger>
                <DropdownMenuItem>
                  <TrashIcon /> Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>

            <DeleteProductAlert productId={product.id} />
          </DropdownMenu>
        </AlertDialog>
      );
    },
  },
];
