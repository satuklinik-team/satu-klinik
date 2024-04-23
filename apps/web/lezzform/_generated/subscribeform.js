import { z as r } from "zod";
import {
  Lezzform as g,
  FormField as m,
  FormItem as l,
  FormLabel as u,
  FormControl as s,
  FormMessage as i,
  Input as h,
  EmailInput as b,
  PhoneNumberInput as C,
  PasswordInput as S,
  TextArea as B,
  Button as d,
} from "@lezzform/react";
import * as p from "react";
import { jsx as o, jsxs as a } from "react/jsx-runtime";
var v = r.object({
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
  z = "EYDrE7LWvZhJHZjnbYL5",
  K = ({
    onSubmit: t,
    onError: c,
    onSuccess: L,
    defaultValues: I,
    onAction: y,
    formProps: P,
  }) => {
    let F = p.useRef();
    p.useEffect(() => {
      t && (F.current = t);
    }, [t]);
    let k = p.useCallback(async (e, n) => {
      if (F.current) return F.current(e, n);
    }, []);
    return o(
      g,
      {
        id: z,
        defaultValues: I,
        onSubmit: k,
        onError: c,
        onSuccess: L,
        zodSchema: v,
        mode: "onSubmit",
        children: (e) =>
          a(g.Container, {
            children: [
              o(m, {
                control: e.control,
                name: "input-1713864706509",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Nama Lengkap" }),
                      o(s, {
                        children: o(h, {
                          label: "Nama Lengkap",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Nama Lengkap",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "emailInput-1713864712957",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Email" }),
                      o(s, {
                        children: o(b, {
                          label: "Email",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Email",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "phoneNumberInput-1713864724181",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Password" }),
                      o(s, {
                        children: o(C, {
                          label: "Password",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Password",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "passwordInput-1713865937493",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Konfirmasi Password" }),
                      o(s, {
                        children: o(S, {
                          label: "Konfirmasi Password",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Konfirmasi Password",
                          styles: { root: { marginBottom: 24 } },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "input-1713866125346",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Nama Klinik" }),
                      o(s, {
                        children: o(h, {
                          label: "Nama Klinik",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Nama Klinik",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "emailInput-1713866155379",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Email Klinik" }),
                      o(s, {
                        children: o(b, {
                          label: "Email Klinik",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Email Klinik",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "phoneNumberInput-1713866194859",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "No Telp. Klinik" }),
                      o(s, {
                        children: o(C, {
                          label: "No Telp. Klinik",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "No Telp. Klinik",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "textarea-1713866248190",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Alamat" }),
                      o(s, {
                        children: o(B, {
                          label: "Alamat",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Alamat",
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: e.control,
                name: "input-1713866308216",
                render: ({ field: n }) =>
                  a(l, {
                    children: [
                      o(u, { children: "Kode Fasyankes" }),
                      o(s, {
                        children: o(h, {
                          label: "Kode Fasyankes",
                          name: n.name,
                          value: n.value ?? "",
                          onBlur: n.onBlur,
                          onChange: n.onChange,
                          placeholder: "Kode Fasyankes",
                          styles: { root: { marginBottom: 48 } },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(d, {
                type: "submit",
                className: "w-full",
                disabled: e.formState.isSubmitting,
                isLoading: e.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Buat Akun",
              }),
            ],
          }),
      },
      z
    );
  };
export { K as Form };
