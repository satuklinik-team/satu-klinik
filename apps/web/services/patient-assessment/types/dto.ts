import { z } from "zod";

import { prescriptionSchema } from "@/services/prescription/types/entity";

export const createPatientAssessmentSchema = z.object({
  mrid: z.string().optional(),
  subjective: z.string(),
  objective: z.string(),
  assessment: z.string(),
  plan: z.string(),
  icd10Code: z.string(),
  icd9CMCode: z.string(),
  prescriptions: z.array(prescriptionSchema).optional(),
});

export type CreatePatientAssessmentSchema = z.infer<
  typeof createPatientAssessmentSchema
>;

export type CreatePatientAssessmentDto = CreatePatientAssessmentSchema;
