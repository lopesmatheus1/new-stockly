import { z } from "zod";

export type ProductFormSchema = z.infer<typeof upsertProductSchema>;

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: "O nome do produto é obrigatório.",
    })
    .max(50),
  price: z
    .number({ message: "O preço é obrigatório" })
    .positive({ message: "Apenas númeors positivos podem ser inseridos." }),
  stock: z.coerce
    .number({ message: "O estoque é obrigatório" })
    .nonnegative({ message: "Apenas númeors positivos podem ser inseridos." }),
});
