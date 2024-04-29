import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    medicalNumber: z.ZodOptional<z.ZodString>;
    nik: z.ZodString;
    fullname: z.ZodString;
    sex: z.ZodString;
    blood: z.ZodString;
    birthAt: z.ZodDate;
    phone: z.ZodEffects<z.ZodString, string, string>;
    address: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    address?: string;
    medicalNumber?: string;
    nik?: string;
    fullname?: string;
    sex?: string;
    blood?: string;
    birthAt?: Date;
    phone?: string;
  },
  {
    address?: string;
    medicalNumber?: string;
    nik?: string;
    fullname?: string;
    sex?: string;
    blood?: string;
    birthAt?: Date;
    phone?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713924193321": OnActionFn;
  "button-1713924197611": OnActionFn;
};
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
