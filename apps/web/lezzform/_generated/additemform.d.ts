import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    image: z.ZodString;
    categoryId: z.ZodString;
    title: z.ZodString;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodNumber;
    discount: z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title?: string;
    image?: string;
    categoryId?: string;
    price?: number;
    stock?: number;
    discount?: number;
  },
  {
    title?: string;
    image?: string;
    categoryId?: string;
    price?: number;
    stock?: number;
    discount?: number;
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
