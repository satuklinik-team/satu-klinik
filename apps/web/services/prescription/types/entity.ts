import { z } from "zod";

export const prescriptionSchema = z.object({
  id: z.string().optional(),
  medicine: z.object({
    id: z.string(),
    name: z.string(),
  }),
  frequency: z.number(),
  period: z.number(),
  doseQuantity: z.number(),
  supplyDuration: z.number(),
  totalQuantity: z.number(),
  notes: z.string().optional(),
});

export type PrescriptionSchema = z.infer<typeof prescriptionSchema>;

export type PrescriptionDto = PrescriptionSchema;
export type PrescriptionEntity = PrescriptionDto;
