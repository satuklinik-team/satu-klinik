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
  EmailInput,
  TextArea,
  Dropdown,
  PasswordInput,
  Spacer,
  TwoColumn,
  Button,
} from "@lezzform/react";
import { UserRound, Mail, ChevronDown } from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  name: z.string().optional(),
  "emailInput-1713871204480": z.string().email().optional(),
  "input-1713871261634": z.string().optional(),
  "textarea-1713871376397": z.string().optional(),
  "singleSelect-1713871528625": z.string().optional(),
  "passwordInput-1713871400734": z.string().optional(),
  "passwordInput-1713871418205": z.string().optional(),
});

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

const id = "TGhm9wEzP2assjJWu8dr";

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
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input
                    label="Nama Lengkap"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Nama Lengkap"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <UserRound size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailInput-1713871204480"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <EmailInput
                    label="Email"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Email"
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    prefixAdornment={{
                      icon: <Mail size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input-1713871261634"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input
                    label="Nomor Telepon"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Nomor Telepon"
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
            name="textarea-1713871376397"
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
          <FormField
            control={form.control}
            name="singleSelect-1713871528625"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Dropdown.List
                    label="Role"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Role"
                    items={[
                      { label: "Admin", value: "Admin" },
                      { label: "Dokter", value: "Doctor" },
                      { label: "Apoteker", value: "Apoteker" },
                      { label: "Asisten", value: "Assistant" },
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
            name="passwordInput-1713871400734"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    label="Password"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Password"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordInput-1713871418205"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    label="Konfirmasi Password"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Konfirmasi Password"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Spacer styles={{ root: {} }} size={16} />
          <TwoColumn styles={{ root: {} }}>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713871145398"] &&
                  onAction?.["button-1713871145398"](form);
              }}
              styles={{ root: { backgroundColor: "#2E584F" } }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713871147318"] &&
                  onAction?.["button-1713871147318"](form);
              }}
              styles={{ root: { backgroundColor: "rgb(239, 68, 68)" } }}
            >
              Reset
            </Button>
          </TwoColumn>
        </Lezzform.Container>
      )}
    </Lezzform>
  );
};
