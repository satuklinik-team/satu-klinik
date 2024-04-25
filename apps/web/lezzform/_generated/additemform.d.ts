import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    "attachment-1713877181989": z.ZodString;
    category: z.ZodString;
    title: z.ZodString;
    price: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodNumber;
    discount: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title?: string;
    category?: string;
    "attachment-1713877181989"?: string;
    price?: number;
    quantity?: number;
    discount?: number;
  },
  {
    title?: string;
    category?: string;
    "attachment-1713877181989"?: string;
    price?: number;
    quantity?: number;
    discount?: number;
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
