import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    "input-1713864706509": z.ZodOptional<z.ZodString>;
    "emailInput-1713864712957": z.ZodOptional<z.ZodString>;
    "phoneNumberInput-1713864724181": z.ZodOptional<
      z.ZodEffects<z.ZodString, string, string>
    >;
    "passwordInput-1713865937493": z.ZodOptional<z.ZodString>;
    "input-1713866125346": z.ZodOptional<z.ZodString>;
    "emailInput-1713866155379": z.ZodOptional<z.ZodString>;
    "phoneNumberInput-1713866194859": z.ZodOptional<
      z.ZodEffects<z.ZodString, string, string>
    >;
    "textarea-1713866248190": z.ZodOptional<z.ZodString>;
    "input-1713866308216": z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    "input-1713864706509"?: string;
    "emailInput-1713864712957"?: string;
    "phoneNumberInput-1713864724181"?: string;
    "passwordInput-1713865937493"?: string;
    "input-1713866125346"?: string;
    "emailInput-1713866155379"?: string;
    "phoneNumberInput-1713866194859"?: string;
    "textarea-1713866248190"?: string;
    "input-1713866308216"?: string;
  },
  {
    "input-1713864706509"?: string;
    "emailInput-1713864712957"?: string;
    "phoneNumberInput-1713864724181"?: string;
    "passwordInput-1713865937493"?: string;
    "input-1713866125346"?: string;
    "emailInput-1713866155379"?: string;
    "phoneNumberInput-1713866194859"?: string;
    "textarea-1713866248190"?: string;
    "input-1713866308216"?: string;
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
