"use server";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, ProductFormSchema } from "./schema";

export const createProduct = async (data: ProductFormSchema) => {
  createProductSchema.parse(data);
  await db.product.create({ data });
  revalidatePath("/products");
};
