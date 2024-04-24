import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import {
  Lezzform,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  PhoneNumberInput,
  NumberInput,
  Button,
} from "@lezzform/react";
import { Briefcase, CreditCard, Building, Phone } from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  "input-1713880139587": z.string().optional(),
  "input-1713880141267": z.string().optional(),
  "input-1713880143659": z.string().optional(),
  "phoneNumberInput-1713880247470": z
    .string()
    .max(14)
    .min(10)
    .refine(
      (value) => {
        const formatRegex =
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
        return !value || formatRegex.test(value);
      },
      { message: "Invalid phone number format" },
    )
    .optional(),
  "input-1713880241782": z.string().optional(),
  "numberInput-1713880284230": z.coerce.number().optional(),
});

export type FormSchema = z.infer<typeof zodFormSchema>;

type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;

type OnAction = {};

interface Props {
  onSubmit?: (form: LezzformReturn<FormSchema>, values: FormSchema) => unknown;
  defaultValues?: FormSchema;
  onSuccess?: (form: LezzformReturn<FormSchema>, values: unknown) => unknown;
  onError?: (form: LezzformReturn<FormSchema>, error: unknown) => unknown;
  onAction?: Partial<OnAction>;
  formProps?: Partial<LezzformProps<FormSchema>>;
}

const id = "CG8az2pJBlpb6WG8Rujd";

export const Form = ({
  onSubmit,
  onError,
  onSuccess,
  defaultValues,
  onAction,
  formProps,
}: Props) => {
  const onSubmitRef = React.useRef<Props["onSubmit"]>();

  React.useEffect(() => {
    if (!onSubmit) return;

    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  const handleSubmit = React.useCallback(
    async (form: LezzformReturn<FormSchema>, values: FormSchema) => {
      if (onSubmitRef.current) return onSubmitRef.current(form, values);
    },
    [],
  );

  return (
    <Lezzform<FormSchema>
      id={id}
      key={id}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onError={onError}
      onSuccess={onSuccess}
      zodSchema={zodFormSchema}
      mode="onSubmit"
    >
      {(form) => (
        <Lezzform.Container>
          <FormField
            control={form.control}
            name="input-1713880139587"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Permit / ID Registrasi / Nomor Lisensi</FormLabel>
                <FormControl>
                  <Input
                    label="ID Permit  / ID Registrasi / Nomor Lisensi"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="ID Permit  / ID Registrasi / Nomor Lisensi"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <Briefcase size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input-1713880141267"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fasyankes ID</FormLabel>
                <FormControl>
                  <Input
                    label="Fasyankes ID"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Fasyankes ID"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <CreditCard size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input-1713880143659"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Klinik</FormLabel>
                <FormControl>
                  <Input
                    label="Nama Klinik"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Nama Klinik"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <Building size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumberInput-1713880247470"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    label="Nomor Telepon"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Nomor Telepon"
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <Phone size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input-1713880241782"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input
                    label="Alamat"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Alamat"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberInput-1713880284230"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Dasar</FormLabel>
                <FormControl>
                  <NumberInput
                    label="Harga Dasar"
                    name={field.name}
                    value={field.value ?? 0}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Harga Dasar"
                    styles={{ root: { marginBottom: 16 } }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            styles={{ root: { backgroundColor: "#2E584F" } }}
          >
            Simpan Perubahan
          </Button>
        </Lezzform.Container>
      )}
    </Lezzform>
  );
};
