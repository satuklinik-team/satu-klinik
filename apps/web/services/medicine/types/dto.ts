import { z } from "zod";

export const createMedicineSchema = z.object({
  image: z.instanceof(Blob).optional(),
  title: z.string(),
  price: z.number().max(999999999, "Maximum 9 digits!").optional(),
  stock: z.number().max(999999999, "Maximum 9 digits!").optional(),
  discount: z.number().max(100, "Maximum 100%!").optional(),
  categoryId: z.number(),
  kfaCode: z.string().optional(),
});

export const updateMedicineSchema = z.object({
  image: z.instanceof(Blob).optional(),
  title: z.string().optional(),
  price: z.number().max(999999999, "Maximum 9 digits!").optional(),
  stock: z.number().max(999999999, "Maximum 9 digits!").optional(),
  discount: z.number().max(100, "Maximum 100%!").optional(),
  categoryId: z.number().optional(),
  kfaCode: z.string().optional(),
});

export type CreateMedicineSchema = z.infer<typeof createMedicineSchema>;

export type CreateMedicineDto = CreateMedicineSchema;

export type UpdateMedicineSchema = z.infer<typeof updateMedicineSchema>;

export type UpdateMedicineDto = UpdateMedicineSchema;
