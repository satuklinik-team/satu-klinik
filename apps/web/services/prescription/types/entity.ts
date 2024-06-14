import { z } from "zod";

export const prescriptionSchema = z.object({
  id: z.coerce.number().optional(),
  medicineId: z.coerce.number().optional(),
  medicine: z
    .object({
      id: z.coerce.number(),
      title: z.string(),
    })
    .optional(),
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
