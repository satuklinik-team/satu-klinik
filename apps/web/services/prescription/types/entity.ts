import { z } from "zod";

export const medicineSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  discount: z.coerce.number(),
  imageUrl: z.string(),
  kfaCode: z.string(),
  satuSehatId: z.string().nullable(),
  categoryId: z.coerce.number(),
  syncWithSatuSehat: z.boolean(),
});

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "object") {
      return { message: "Data tidak valid!" };
    }
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const prescriptionSchema = z.object({
  id: z.coerce.number().optional(),
  medicineId: z.coerce.number().optional(),
  Medicine: medicineSchema
    .omit({ kfaCode: true, syncWithSatuSehat: true })
    .optional()
    .refine((data) => typeof data === "object", {
      message: "Data tidak valid!",
    }),
  frequency: z.coerce.number(),
  period: z.coerce.number(),
  doseQuantity: z.coerce.number(),
  supplyDuration: z.coerce.number(),
  totalQuantity: z.coerce.number().optional(),
  notes: z.string().optional(),
});

export type PrescriptionSchema = z.infer<typeof prescriptionSchema>;

export type PrescriptionDto = PrescriptionSchema;
export type PrescriptionEntity = PrescriptionDto;
