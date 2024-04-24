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
  Divider,
  TwoColumn,
  ThreeColumn,
  Button,
  NumberInput,
} from "@lezzform/react";
import { CreditCard, User, ChevronDown, Calendar, Phone } from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  name: z.string().optional(),
  "input-1713872945718": z.string().optional(),
  "input-1713873050433": z.string().optional(),
  "singleSelect-1713873093059": z.string().optional(),
  "singleSelect-1713873093059-92I": z.string().optional(),
  "datepicker-1713873339995": z.date().optional(),
  "phoneNumberInput-1713873372826": z
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
  "textarea-1713873590984": z.string().optional(),

  "numberInput-1713874892095": z.coerce.number().optional(),
  "numberInput-1713874894502": z.coerce.number().optional(),
  "input-1713874751309": z.string().optional(),

  "numberInput-1713874946578": z.coerce.number().optional(),
  "numberInput-1713874949328": z.coerce.number().optional(),

  "numberInput-1713874970522": z.coerce.number().optional(),
  "numberInput-1713874972041": z.coerce.number().optional(),
  "numberInput-1713874973962": z.coerce.number().optional(),
  "textarea-1713874840335": z.string().optional(),
});

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

const id = "h1M3BLKnSlKhbU2dzYex";

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
            name="name"
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
            name="input-1713872945718"
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
            name="input-1713873050433"
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
            name="singleSelect-1713873093059"
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
                      { label: "Laki-Laki", value: "male" },
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
            name="singleSelect-1713873093059-92I"
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
                      { label: "N/A", value: "empty" },
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
            name="datepicker-1713873339995"
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
            name="phoneNumberInput-1713873372826"
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
            name="textarea-1713873590984"
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
                    placeholder="Nomor Telp"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider.Solid styles={{ root: {} }} size={2} color="#E8E8E8" />
          <TwoColumn styles={{ root: {} }}>
            <FormField
              control={form.control}
              name="numberInput-1713874892095"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Tinggi"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Tinggi dalam cm"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberInput-1713874894502"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Berat"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Berat dalam kg"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TwoColumn>
          <FormField
            control={form.control}
            name="input-1713874751309"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alergi</FormLabel>
                <FormControl>
                  <Input
                    label="Alergi"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Alergi"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TwoColumn styles={{ root: {} }}>
            <FormField
              control={form.control}
              name="numberInput-1713874946578"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systole</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Systole"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Systole"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberInput-1713874949328"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diastole</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Diastole"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Diastole"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TwoColumn>
          <ThreeColumn styles={{ root: {} }}>
            <FormField
              control={form.control}
              name="numberInput-1713874970522"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Denyut Nadi</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Denyut Nadi"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Denyut Nadi"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberInput-1713874972041"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Respirasi</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Respirasi"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Respirasi"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberInput-1713874973962"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suhu</FormLabel>
                  <FormControl>
                    <NumberInput
                      label="Suhu"
                      name={field.name}
                      value={field.value ?? 0}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      placeholder="Suhu"
                      styles={{ root: {} }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ThreeColumn>
          <FormField
            control={form.control}
            name="textarea-1713874840335"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keluhan</FormLabel>
                <FormControl>
                  <TextArea
                    label="Keluhan"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Keluhan"
                    styles={{ root: { marginBottom: 16 } }}
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
                onAction?.["button-1713872929774"] &&
                  onAction?.["button-1713872929774"](form);
              }}
              styles={{ root: { backgroundColor: "rgb(239, 68, 68)" } }}
            >
              Batalkan
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713872927911"] &&
                  onAction?.["button-1713872927911"](form);
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
