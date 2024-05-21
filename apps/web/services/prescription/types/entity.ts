import { z } from "zod";

export const prescriptionSchema = z.object({
  medicineId: z.string(),
  quantity: z.string(),
  usage: z.string(),
});
