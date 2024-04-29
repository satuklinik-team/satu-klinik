import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    "emailInput-1713871204480": z.ZodOptional<z.ZodString>;
    "input-1713871261634": z.ZodOptional<z.ZodString>;
    "textarea-1713871376397": z.ZodOptional<z.ZodString>;
    "singleSelect-1713871528625": z.ZodOptional<z.ZodString>;
    "passwordInput-1713871400734": z.ZodOptional<z.ZodString>;
    "passwordInput-1713871418205": z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    "emailInput-1713871204480"?: string;
    "input-1713871261634"?: string;
    "textarea-1713871376397"?: string;
    "singleSelect-1713871528625"?: string;
    "passwordInput-1713871400734"?: string;
    "passwordInput-1713871418205"?: string;
  },
  {
    name?: string;
    "emailInput-1713871204480"?: string;
    "input-1713871261634"?: string;
    "textarea-1713871376397"?: string;
    "singleSelect-1713871528625"?: string;
    "passwordInput-1713871400734"?: string;
    "passwordInput-1713871418205"?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713871145398": OnActionFn;
  "button-1713871147318": OnActionFn;
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
