import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    "input-1713924229907": z.ZodOptional<z.ZodString>;
    "input-1713924232759": z.ZodOptional<z.ZodString>;
    "input-1713924236229": z.ZodOptional<z.ZodString>;
    "singleSelect-1713924285420": z.ZodOptional<z.ZodString>;
    "singleSelect-1713924373568": z.ZodOptional<z.ZodString>;
    "datepicker-1713924594975": z.ZodOptional<z.ZodDate>;
    "phoneNumberInput-1713924635725": z.ZodOptional<
      z.ZodEffects<z.ZodString, string, string>
    >;
    "textarea-1713924663412": z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    "input-1713924229907"?: string;
    "input-1713924232759"?: string;
    "input-1713924236229"?: string;
    "singleSelect-1713924285420"?: string;
    "singleSelect-1713924373568"?: string;
    "datepicker-1713924594975"?: Date;
    "phoneNumberInput-1713924635725"?: string;
    "textarea-1713924663412"?: string;
  },
  {
    "input-1713924229907"?: string;
    "input-1713924232759"?: string;
    "input-1713924236229"?: string;
    "singleSelect-1713924285420"?: string;
    "singleSelect-1713924373568"?: string;
    "datepicker-1713924594975"?: Date;
    "phoneNumberInput-1713924635725"?: string;
    "textarea-1713924663412"?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713924193321": OnActionFn;
  "button-1713924197611": OnActionFn;
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
