import { z } from "zod";

export const idProductSchema = z.string().uuid();

export type IdProductSchema = z.infer<typeof idProductSchema>;
