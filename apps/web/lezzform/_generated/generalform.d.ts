import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    "input-1713880139587": z.ZodOptional<z.ZodString>;
    "input-1713880141267": z.ZodOptional<z.ZodString>;
    "input-1713880143659": z.ZodOptional<z.ZodString>;
    "phoneNumberInput-1713880247470": z.ZodOptional<
      z.ZodEffects<z.ZodString, string, string>
    >;
    "input-1713880241782": z.ZodOptional<z.ZodString>;
    "numberInput-1713880284230": z.ZodOptional<z.ZodNumber>;
  },
  "strip",
  z.ZodTypeAny,
  {
    "input-1713880139587"?: string;
    "input-1713880141267"?: string;
    "input-1713880143659"?: string;
    "phoneNumberInput-1713880247470"?: string;
    "input-1713880241782"?: string;
    "numberInput-1713880284230"?: number;
  },
  {
    "input-1713880139587"?: string;
    "input-1713880141267"?: string;
    "input-1713880143659"?: string;
    "phoneNumberInput-1713880247470"?: string;
    "input-1713880241782"?: string;
    "numberInput-1713880284230"?: number;
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
