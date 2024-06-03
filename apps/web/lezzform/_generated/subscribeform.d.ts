import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    fullname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    clinicName: z.ZodString;
    clinicEmail: z.ZodString;
    clinicPhone: z.ZodEffects<z.ZodString, string, string>;
    clinicAddress: z.ZodString;
    clinicCode: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    email?: string;
    password?: string;
    fullname?: string;
    confirmPassword?: string;
    clinicName?: string;
    clinicEmail?: string;
    clinicPhone?: string;
    clinicAddress?: string;
    clinicCode?: string;
  },
  {
    email?: string;
    password?: string;
    fullname?: string;
    confirmPassword?: string;
    clinicName?: string;
    clinicEmail?: string;
    clinicPhone?: string;
    clinicAddress?: string;
    clinicCode?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnAction = {};
interface Props {
  onSubmit?: (form: LezzformReturn<FormSchema>, values: FormSchema) => unknown;
  defaultValues?: FormSchema;
  onSuccess?: (form: LezzformReturn<FormSchema>, values: unknown) => unknown;
  onError?: (form: LezzformReturn<FormSchema>, error: unknown) => unknown;
  onAction?: Partial<OnAction>;
  formProps?: Partial<LezzformProps<FormSchema>>;
}
export declare const Form: ({
  onSubmit,
  onError,
  onSuccess,
  defaultValues,
  onAction,
  formProps,
}: Props) => React.JSX.Element;
export {};
