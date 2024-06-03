import { z as n } from "zod";
import {
  Lezzform as h,
  FormField as m,
  FormItem as l,
  FormLabel as t,
  FormControl as s,
  FormMessage as i,
  Input as F,
  EmailInput as p,
  PasswordInput as g,
  Divider as S,
  PhoneNumberInput as L,
  TextArea as y,
  Spacer as B,
  Button as P,
} from "@lezzform/react";
import * as c from "react";
import { jsx as o, jsxs as a } from "react/jsx-runtime";
var v = n.object({
    fullname: n.string(),
    email: n.string().email(),
    password: n.string().max(14).min(6),
    confirmPassword: n.string().max(14).min(6),
    clinicName: n.string(),
    clinicEmail: n.string().email(),
    clinicPhone: n
      .string()
      .max(14)
      .min(10)
      .refine(
        (u) =>
          !u ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(u),
        { message: "Invalid phone number format" }
      ),
    clinicAddress: n.string(),
    clinicCode: n.string(),
  }),
  C = "GVTNzwi4PukBz8q7gRND",
  N = ({
    onSubmit: u,
    onError: b,
    onSuccess: z,
    defaultValues: R,
    onAction: q,
    formProps: w,
  }) => {
    let d = c.useRef();
    c.useEffect(() => {
      u && (d.current = u);
    }, [u]);
    let k = c.useCallback(async (r, e) => {
      if (d.current) return d.current(r, e);
    }, []);
    return o(
      h,
      {
        id: C,
        defaultValues: R,
        onSubmit: k,
        onError: b,
        onSuccess: z,
        zodSchema: v,
        mode: "onSubmit",
        children: (r) =>
          a(h.Container, {
            children: [
              o(m, {
                control: r.control,
                name: "fullname",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Nama Lengkap" }),
                      o(s, {
                        children: o(F, {
                          label: "Nama Lengkap",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nama Lengkap",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "email",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Email" }),
                      o(s, {
                        children: o(p, {
                          label: "Email",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Email",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "password",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Password" }),
                      o(s, {
                        children: o(g, {
                          label: "Password",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Konfirmasi Password" }),
                      o(s, {
                        children: o(g, {
                          label: "Konfirmasi Password",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Konfirmasi Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(S.Solid, { styles: { root: {} }, size: 1, color: "#c7c7c7" }),
              o(m, {
                control: r.control,
                name: "clinicName",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Nama Klinik" }),
                      o(s, {
                        children: o(F, {
                          label: "Nama Klinik",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nama Klinik",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "clinicEmail",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Email Klinik" }),
                      o(s, {
                        children: o(p, {
                          label: "Email Klinik",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Email Klinik",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "clinicPhone",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "No Telp. Klinik" }),
                      o(s, {
                        children: o(L, {
                          label: "No Telp. Klinik",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "No Telp. Klinik",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "clinicAddress",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Alamat" }),
                      o(s, {
                        children: o(y, {
                          label: "Alamat",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Alamat",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(m, {
                control: r.control,
                name: "clinicCode",
                render: ({ field: e }) =>
                  a(l, {
                    children: [
                      o(t, { isRequired: !0, children: "Kode Fasyankes" }),
                      o(s, {
                        children: o(F, {
                          label: "Kode Fasyankes",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Kode Fasyankes",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(i, {}),
                    ],
                  }),
              }),
              o(B, { styles: { root: {} }, size: 16 }),
              o(P, {
                type: "submit",
                className: "w-full",
                disabled: r.formState.isSubmitting,
                isLoading: r.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Buat Akun",
              }),
            ],
          }),
      },
      C
    );
  };
export { N as Form };
