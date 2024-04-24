import { z } from "zod";
import type { LezzformReturn, LezzformProps } from "@lezzform/react";
import {
  Lezzform,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Attachment,
  Dropdown,
  Input,
  NumberInput,
  TwoColumn,
  Button,
} from "@lezzform/react";
import { ChevronDown } from "lucide-react";
import * as React from "react";

const zodFormSchema = z.object({
  "attachment-1713877181989": z.string().optional(),
  "singleSelect-1713877151261": z.string().optional(),
  "input-1713876922462": z.string().optional(),
  "numberInput-1713876810979": z.coerce.number().optional(),
  "numberInput-1713876818843": z.coerce.number().optional(),
  "numberInput-1713876836868": z.coerce.number().optional(),
});

export type FormSchema = z.infer<typeof zodFormSchema>;

type OnActionFn = (form: LezzformReturn<FormSchema>) => unknown;

type OnAction = {
  "button-1713876963119": OnActionFn;
  "button-1713876964678": OnActionFn;
};

interface Props {
  onSubmit?: (form: LezzformReturn<FormSchema>, values: FormSchema) => unknown;
  defaultValues?: FormSchema;
  onSuccess?: (form: LezzformReturn<FormSchema>, values: unknown) => unknown;
  onError?: (form: LezzformReturn<FormSchema>, error: unknown) => unknown;
  onAction?: Partial<OnAction>;
  formProps?: Partial<LezzformProps<FormSchema>>;
}

const id = "eenwuufNCyG5gSH6zfG1";

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
            name="attachment-1713877181989"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Picture</FormLabel>
                <FormControl>
                  <Attachment
                    label="Main Picture"
                    name={field.name}
                    value={field.value}
                    onChange={(fileUrl) => {
                      field.onChange(fileUrl);
                      form.clearErrors(field.name);
                    }}
                    disabled={field.disabled}
                    placeholder=""
                    acceptedFormats={["image/jpeg", "image/png"]}
                    maxSize={2048}
                    headers={[]}
                    onError={(message) => {
                      form.setError(field.name, { message });
                    }}
                    path={{ value: "" }}
                    url=""
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="singleSelect-1713877151261"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Dropdown
                    label="Category"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    items={[
                      { label: "Option 1", value: "option1" },
                      { label: "Option 2", value: "option2" },
                      { label: "Option 3", value: "option3" },
                    ]}
                    disabled={field.disabled}
                    styles={{ root: {} }}
                    suffixAdornment={{
                      icon: <ChevronDown size={18} color="#000000" />,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="input-1713876922462"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    label="Title"
                    name={field.name}
                    value={field.value ?? ""}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder="Title"
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
            name="numberInput-1713876810979"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <NumberInput
                    label="Price"
                    name={field.name}
                    value={field.value ?? 0}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Price"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberInput-1713876818843"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <NumberInput
                    label="Quantity"
                    name={field.name}
                    value={field.value ?? 0}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Quantity"
                    styles={{ root: {} }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberInput-1713876836868"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <NumberInput
                    label="Discount"
                    name={field.name}
                    value={field.value ?? 0}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    placeholder="Discount"
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
                onAction?.["button-1713876963119"] &&
                  onAction?.["button-1713876963119"](form);
              }}
              styles={{ root: { backgroundColor: "#2E584F" } }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                onAction?.["button-1713876964678"] &&
                  onAction?.["button-1713876964678"](form);
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
