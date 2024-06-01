import { z } from "zod";

export const createMedicineSchema = z.object({
  image: z.instanceof(FileList).optional(),
  title: z.string(),
  price: z.number(),
  stock: z.number(),
  discount: z.number(),
  categoryId: z.number(),
});

export const updateMedicineSchema = z.object({
  image: z.instanceof(FileList).optional(),
  title: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  discount: z.number().optional(),
  categoryId: z.number().optional(),
});

export type CreateMedicineSchema = z.infer<typeof createMedicineSchema>;

export type CreateMedicineDto = CreateMedicineSchema;

export type UpdateMedicineSchema = z.infer<typeof updateMedicineSchema>;

export type UpdateMedicineDto = UpdateMedicineSchema;
