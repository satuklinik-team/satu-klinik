import { z } from "zod";

export const updateSettingSchema = z.object({
  license: z.string().optional(),
  fasyankesId: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  serviceFee: z.coerce.number().optional(),
});
export type UpdateSettingSchema = z.infer<typeof updateSettingSchema>;
export type UpdateSettingDto = UpdateSettingSchema;
