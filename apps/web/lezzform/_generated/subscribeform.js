import { z as r } from "zod";
import {
  Lezzform as d,
  FormField as m,
  FormItem as l,
  FormLabel as s,
  FormControl as u,
  FormMessage as i,
  Input as F,
  EmailInput as h,
  PhoneNumberInput as g,
  PasswordInput as S,
  Divider as k,
  TextArea as y,
  Spacer as v,
  Button as B,
} from "@lezzform/react";
import * as c from "react";
import { jsx as e, jsxs as a } from "react/jsx-runtime";
var P = r.object({
    "input-1713864706509": r.string().optional(),
    "emailInput-1713864712957": r.string().email().optional(),
    "phoneNumberInput-1713864724181": r
      .string()
      .max(14)
      .min(10)
      .refine(
        (t) =>
          !t ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(t),
        { message: "Invalid phone number format" }
      )
      .optional(),
    "passwordInput-1713865937493": r.string().optional(),
    "input-1713866125346": r.string().optional(),
    "emailInput-1713866155379": r.string().email().optional(),
    "phoneNumberInput-1713866194859": r
      .string()
      .max(14)
      .min(10)
      .refine(
        (t) =>
          !t ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(t),
        { message: "Invalid phone number format" }
      )
      .optional(),
    "textarea-1713866248190": r.string().optional(),
    "input-1713866308216": r.string().optional(),
  }),
  C = "9IGjQtTYM8ebIRxhFL7O",
  x = ({
    onSubmit: t,
    onError: p,
    onSuccess: z,
    defaultValues: I,
    onAction: R,
    formProps: w,
  }) => {
    let b = c.useRef();
    c.useEffect(() => {
      t && (b.current = t);
    }, [t]);
    let L = c.useCallback(async (n, o) => {
      if (b.current) return b.current(n, o);
    }, []);
    return e(
      d,
      {
        id: C,
        defaultValues: I,
        onSubmit: L,
        onError: p,
        onSuccess: z,
        zodSchema: P,
        mode: "onSubmit",
        children: (n) =>
          a(d.Container, {
            children: [
              e(m, {
                control: n.control,
                name: "input-1713864706509",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Nama Lengkap" }),
                      e(u, {
                        children: e(F, {
                          label: "Nama Lengkap",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Lengkap",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "emailInput-1713864712957",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Email" }),
                      e(u, {
                        children: e(h, {
                          label: "Email",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "phoneNumberInput-1713864724181",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Password" }),
                      e(u, {
                        children: e(g, {
                          label: "Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Password",
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "passwordInput-1713865937493",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Konfirmasi Password" }),
                      e(u, {
                        children: e(S, {
                          label: "Konfirmasi Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Konfirmasi Password",
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(k.Solid, { styles: { root: {} }, size: 1, color: "#c7c7c7" }),
              e(m, {
                control: n.control,
                name: "input-1713866125346",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Nama Klinik" }),
                      e(u, {
                        children: e(F, {
                          label: "Nama Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Klinik",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "emailInput-1713866155379",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Email Klinik" }),
                      e(u, {
                        children: e(h, {
                          label: "Email Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email Klinik",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "phoneNumberInput-1713866194859",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "No Telp. Klinik" }),
                      e(u, {
                        children: e(g, {
                          label: "No Telp. Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "No Telp. Klinik",
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "textarea-1713866248190",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Alamat" }),
                      e(u, {
                        children: e(y, {
                          label: "Alamat",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Alamat",
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: n.control,
                name: "input-1713866308216",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Kode Fasyankes" }),
                      e(u, {
                        children: e(F, {
                          label: "Kode Fasyankes",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Kode Fasyankes",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(v, { styles: { root: {} }, size: 13 }),
              e(B, {
                type: "submit",
                className: "w-full",
                disabled: n.formState.isSubmitting,
                isLoading: n.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Buat Akun",
              }),
            ],
          }),
      },
      C
    );
  };
export { x as Form };
