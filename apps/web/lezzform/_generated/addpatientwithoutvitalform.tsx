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
  Dropdown,
  DatePicker,
  PhoneNumberInput,
  TextArea,
  TwoColumn,
  Button,
} from "@lezzform/react";
import { CreditCard, User, ChevronDown, Calendar, Phone } from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  "input-1713924229907": z.string().optional(),
  "input-1713924232759": z.string().optional(),
  "input-1713924236229": z.string().optional(),
  "singleSelect-1713924285420": z.string().optional(),
  "singleSelect-1713924373568": z.string().optional(),
  "datepicker-1713924594975": z.date().optional(),
  "phoneNumberInput-1713924635725": z
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
  "textarea-1713924663412": z.string().optional(),
});

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

const id = "gkChi270oYhdqT0WHW7d";

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
            name="input-1713924229907"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Rekam Medis</FormLabel>
                <FormControl>
                  <Input
                    label="Nomor Rekam Medis"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Nomor Rekam Medis"
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
            name="input-1713924232759"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input
                    label="NIK"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="NIK"
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
            name="input-1713924236229"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    label="Nama"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Nama"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <User size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="singleSelect-1713924285420"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <FormControl>
                  <Dropdown.List
                    label="Jenis Kelamin"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    items={[
                      { label: "Laki-laki", value: "male" },
                      { label: "Perempuan", value: "female" },
                    ]}
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
            name="singleSelect-1713924373568"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Golongan Darah</FormLabel>
                <FormControl>
                  <Dropdown.List
                    label="Golongan Darah"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    items={[
                      { label: "empty", value: "N/A" },
                      { label: "A", value: "a" },
                      { label: "B", value: "b" },
                      { label: "AB", value: "ab" },
                      { label: "O", value: "o" },
                    ]}
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
            name="datepicker-1713924594975"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl>
                  <DatePicker
                    label="Tanggal Lahir"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="dd/mm/yyyy"
                    format="PPP"
                    styles={{ root: {} }}
                    disabled={field.disabled}
                    prefixAdornment={{
                      icon: <Calendar size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumberInput-1713924635725"
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
            name="textarea-1713924663412"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <TextArea
                    label="Alamat"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Alamat"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TwoColumn styles={{ root: {} }}>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713924193321"] &&
                  onAction?.["button-1713924193321"](form);
              }}
              styles={{ root: { backgroundColor: "rgb(239, 68, 68)" } }}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713924197611"] &&
                  onAction?.["button-1713924197611"](form);
              }}
              styles={{ root: { backgroundColor: "#2E584F" } }}
            >
              Daftar
            </Button>
          </TwoColumn>
        </Lezzform.Container>
      )}
    </Lezzform>
  );
};
