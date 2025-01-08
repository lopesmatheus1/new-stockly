"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import { Circle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
];
