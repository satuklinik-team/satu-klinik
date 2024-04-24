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
  PasswordInput,
  Button,
} from "@lezzform/react";
import {} from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  name: z.string().optional(),
  "name-oSh": z.string().optional(),
  "name-oSh-5Su": z.string().optional(),
  "passwordInput-1713880776428": z.string().optional(),
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

const id = "NpSkWUy4XDm18yx8Lca3";

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
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    label="ID"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="ID"
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
            name="name-oSh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input
                    label="Token"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Token"
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
            name="name-oSh-5Su"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    label="Username"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Username"
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
            name="passwordInput-1713880776428"
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
            Simpan
          </Button>
        </Lezzform.Container>
      )}
    </Lezzform>
  );
};
