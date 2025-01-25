"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (trx) => {
      if (!id)
        returnValidationErrors(deleteSaleSchema, {
          _errors: ["A venda não existe"],
        });
      const existingSale = await db.sale.findUnique({ where: { id } });
      if (!existingSale)
        returnValidationErrors(deleteSaleSchema, {
          _errors: ["A venda não foi encontrada"],
        });

      const sale = await db.sale.findUnique({
        where: { id },
        include: {
          saleProducts: true,
        },
      });
      await trx.sale.delete({
        where: {
          id,
        },
      });

      if (!sale) return;
      for (const product of sale.saleProducts) {
        await trx.product.update({
          where: { id: product.productId },
          data: {
            stock: {
              increment: product.quantity,
            },
          },
        });
      }
    });

    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath("/sales");
  });
