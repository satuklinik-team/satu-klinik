import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    "name-oSh": z.ZodOptional<z.ZodString>;
    "name-oSh-5Su": z.ZodOptional<z.ZodString>;
    "passwordInput-1713880776428": z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    "name-oSh"?: string;
    "name-oSh-5Su"?: string;
    "passwordInput-1713880776428"?: string;
  },
  {
    name?: string;
    "name-oSh"?: string;
    "name-oSh-5Su"?: string;
    "passwordInput-1713880776428"?: string;
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
