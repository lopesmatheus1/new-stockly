import "server-only";
import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

export interface ProductsDto extends Product {
  status?: "OUT_OF_STOCK" | "IN_STOCK";
}

export const getProducts = async (): Promise<ProductsDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
