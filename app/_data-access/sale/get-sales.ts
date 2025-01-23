import "server-only";

import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}
export interface SalesDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProduct: SaleProductDto[];
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: { saleProducts: { include: { product: true } } },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
    productNames: sale.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" • "),
    saleProduct: sale.saleProducts.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.productId,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};
