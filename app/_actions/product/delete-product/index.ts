"use server";
import { db } from "@/app/_lib/prisma";
import { idProductSchema, IdProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: IdProductSchema) => {
  idProductSchema.parse(productId);

  await db.product.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/products");
};
