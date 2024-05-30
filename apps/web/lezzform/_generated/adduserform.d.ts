import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    fullname: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    nik: z.ZodString;
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
    fullname?: string;
    phone?: string;
    nik?: string;
    confirmPassword?: string;
  },
  {
    address?: string;
    role?: string;
    email?: string;
    password?: string;
    fullname?: string;
    phone?: string;
    nik?: string;
    confirmPassword?: string;
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
