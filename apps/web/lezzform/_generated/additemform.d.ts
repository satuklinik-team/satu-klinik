import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    "attachment-1713877181989": z.ZodOptional<z.ZodString>;
    "singleSelect-1713877151261": z.ZodOptional<z.ZodString>;
    "input-1713876922462": z.ZodOptional<z.ZodString>;
    "numberInput-1713876810979": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713876818843": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713876836868": z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    "attachment-1713877181989"?: string;
    "singleSelect-1713877151261"?: string;
    "input-1713876922462"?: string;
    "numberInput-1713876810979"?: number;
    "numberInput-1713876818843"?: number;
    "numberInput-1713876836868"?: number;
  },
  {
    "attachment-1713877181989"?: string;
    "singleSelect-1713877151261"?: string;
    "input-1713876922462"?: string;
    "numberInput-1713876810979"?: number;
    "numberInput-1713876818843"?: number;
    "numberInput-1713876836868"?: number;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713876963119": OnActionFn;
  "button-1713876964678": OnActionFn;
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
