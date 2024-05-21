import { z } from "zod";

import { prescriptionSchema } from "@/services/prescription/types/entity";

export const createPatientAssessmentSchema = z.object({
  mrId: z.string(),
  subjective: z.string(),
  objective: z.string(),
  assessment: z.string(),
  plan: z.string(),
  icd10Code: z.string(),
  icd9CMCode: z.string(),
  prescription: z.array(prescriptionSchema),
});

export type CreatePatientAssessmentSchema = z.infer<
  typeof createPatientAssessmentSchema
>;

export type CreatePatientAssessmentDto = CreatePatientAssessmentSchema;
