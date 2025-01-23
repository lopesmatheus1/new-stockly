"use client";

import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { FormatCurrency } from "@/app/_helpers/currency";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    header: "Quantidade de produtos",
    accessorKey: "totalProducts",
  },
  {
    header: "Valor total",
    accessorKey: "totalAmount",
    cell: (row) => {
      const totalPrice = row.row.original.totalAmount;
      return <p>{FormatCurrency(totalPrice)}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: (row) => {
      const date = row.row.original.date;
      return <p>{Intl.DateTimeFormat("pt-BR").format(new Date(date))}</p>;
    },
  },
  {
    header: "Ações",
    cell: () => {
      return (
        <Button variant={"ghost"}>
          <MoreHorizontalIcon />
        </Button>
      );
    },
  },
];
