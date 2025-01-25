"use server";
import { db } from "@/app/_lib/prisma";
import { deleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    const productNotFound = !id;
    if (productNotFound)
      returnValidationErrors(deleteProductSchema, {
        _errors: ["O produto não foi encontrado"],
      });

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct)
      returnValidationErrors(deleteProductSchema, {
        _errors: ["O produto não foi encontrado"],
      });

    await db.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath("/sales");
  });
