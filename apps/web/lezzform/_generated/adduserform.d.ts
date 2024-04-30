import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
    role: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    address?: string;
    role?: string;
    email?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    confirmPassword?: string;
  },
  {
    address?: string;
    role?: string;
    email?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    confirmPassword?: string;
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
