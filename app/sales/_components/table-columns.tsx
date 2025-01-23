"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { FormatCurrency } from "@/app/_helpers/currency";

import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";
import { ProductsDto } from "@/app/_data-access/products/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumns extends SalesDto {
  products: ProductsDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumns>[] = [
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
    cell: (row) => {
      const sales = row.row.original;
      return (
        <SalesTableDropdownMenu
          products={sales.products}
          productOptions={sales.productOptions}
          sale={sales}
        />
      );
    },
  },
];
