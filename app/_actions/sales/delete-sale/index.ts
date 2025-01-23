"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    if (!id)
      returnValidationErrors(deleteSaleSchema, {
        _errors: ["A venda não existe"],
      });
    const existingSale = await db.sale.findUnique({ where: { id } });
    if (!existingSale)
      returnValidationErrors(deleteSaleSchema, {
        _errors: ["A venda não foi encontrada"],
      });
    await db.sale.delete({
      where: {
        id,
      },
    });
    revalidatePath("/sales");
  });
