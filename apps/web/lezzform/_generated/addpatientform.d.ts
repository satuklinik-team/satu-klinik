import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    nik: z.ZodString;
    fullname: z.ZodString;
    sex: z.ZodString;
    blood: z.ZodString;
    birthAt: z.ZodDate;
    phone: z.ZodEffects<z.ZodString, string, string>;
    address: z.ZodString;
    height: z.ZodNumber;
    weight: z.ZodNumber;
    allergic: z.ZodString;
    systole: z.ZodNumber;
    diastole: z.ZodNumber;
    pulse: z.ZodNumber;
    respiration: z.ZodNumber;
    temperature: z.ZodNumber;
    pain: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    height?: number;
    address?: string;
    name?: string;
    weight?: number;
    nik?: string;
    fullname?: string;
    sex?: string;
    blood?: string;
    birthAt?: Date;
    phone?: string;
    allergic?: string;
    systole?: number;
    diastole?: number;
    pulse?: number;
    respiration?: number;
    temperature?: number;
    pain?: string;
  },
  {
    height?: number;
    address?: string;
    name?: string;
    weight?: number;
    nik?: string;
    fullname?: string;
    sex?: string;
    blood?: string;
    birthAt?: Date;
    phone?: string;
    allergic?: string;
    systole?: number;
    diastole?: number;
    pulse?: number;
    respiration?: number;
    temperature?: number;
    pain?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713872929774": OnActionFn;
  "button-1713872927911": OnActionFn;
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
