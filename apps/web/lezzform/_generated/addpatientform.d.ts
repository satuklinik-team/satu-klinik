import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import * as React from "react";
declare const zodFormSchema: z.ZodObject<
  {
    name: z.ZodOptional<z.ZodString>;
    "input-1713872945718": z.ZodOptional<z.ZodString>;
    "input-1713873050433": z.ZodOptional<z.ZodString>;
    "singleSelect-1713873093059": z.ZodOptional<z.ZodString>;
    "singleSelect-1713873093059-92I": z.ZodOptional<z.ZodString>;
    "datepicker-1713873339995": z.ZodOptional<z.ZodDate>;
    "phoneNumberInput-1713873372826": z.ZodOptional<
      z.ZodEffects<z.ZodString, string, string>
    >;
    "textarea-1713873590984": z.ZodOptional<z.ZodString>;
    "numberInput-1713874892095": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713874894502": z.ZodOptional<z.ZodNumber>;
    "input-1713874751309": z.ZodOptional<z.ZodString>;
    "numberInput-1713874946578": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713874949328": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713874970522": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713874972041": z.ZodOptional<z.ZodNumber>;
    "numberInput-1713874973962": z.ZodOptional<z.ZodNumber>;
    "textarea-1713874840335": z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    "input-1713872945718"?: string;
    "input-1713873050433"?: string;
    "singleSelect-1713873093059"?: string;
    "singleSelect-1713873093059-92I"?: string;
    "datepicker-1713873339995"?: Date;
    "phoneNumberInput-1713873372826"?: string;
    "textarea-1713873590984"?: string;
    "numberInput-1713874892095"?: number;
    "numberInput-1713874894502"?: number;
    "input-1713874751309"?: string;
    "numberInput-1713874946578"?: number;
    "numberInput-1713874949328"?: number;
    "numberInput-1713874970522"?: number;
    "numberInput-1713874972041"?: number;
    "numberInput-1713874973962"?: number;
    "textarea-1713874840335"?: string;
  },
  {
    name?: string;
    "input-1713872945718"?: string;
    "input-1713873050433"?: string;
    "singleSelect-1713873093059"?: string;
    "singleSelect-1713873093059-92I"?: string;
    "datepicker-1713873339995"?: Date;
    "phoneNumberInput-1713873372826"?: string;
    "textarea-1713873590984"?: string;
    "numberInput-1713874892095"?: number;
    "numberInput-1713874894502"?: number;
    "input-1713874751309"?: string;
    "numberInput-1713874946578"?: number;
    "numberInput-1713874949328"?: number;
    "numberInput-1713874970522"?: number;
    "numberInput-1713874972041"?: number;
    "numberInput-1713874973962"?: number;
    "textarea-1713874840335"?: string;
  }
>;
export type FormSchema = z.infer<typeof zodFormSchema>;
type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;
type OnAction = {
  "button-1713872929774": OnActionFn;
  "button-1713872927911": OnActionFn;
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
