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
  Divider as k,
  PhoneNumberInput as S,
  TextArea as y,
  Spacer as v,
  Button as B,
} from "@lezzform/react";
import * as c from "react";
import { jsx as e, jsxs as a } from "react/jsx-runtime";
var P = n.object({
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
    clinicCode: n.string().optional(),
  }),
  C = "ajmQEGmRfrnEL755Xory",
  K = ({
    onSubmit: u,
    onError: b,
    onSuccess: z,
    defaultValues: R,
    onAction: w,
    formProps: q,
  }) => {
    let d = c.useRef();
    c.useEffect(() => {
      u && (d.current = u);
    }, [u]);
    let L = c.useCallback(async (r, o) => {
      if (d.current) return d.current(r, o);
    }, []);
    return e(
      h,
      {
        id: C,
        defaultValues: R,
        onSubmit: L,
        onError: b,
        onSuccess: z,
        zodSchema: P,
        mode: "onTouched",
        children: (r) =>
          a(h.Container, {
            children: [
              e(m, {
                control: r.control,
                name: "fullname",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Nama Lengkap" }),
                      e(s, {
                        children: e(F, {
                          label: "Nama Lengkap",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Lengkap",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "email",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Email" }),
                      e(s, {
                        children: e(p, {
                          label: "Email",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "password",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Password" }),
                      e(s, {
                        children: e(g, {
                          label: "Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Konfirmasi Password" }),
                      e(s, {
                        children: e(g, {
                          label: "Konfirmasi Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Konfirmasi Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(k.Solid, { styles: { root: {} }, size: 1, color: "#c7c7c7" }),
              e(m, {
                control: r.control,
                name: "clinicName",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Nama Klinik" }),
                      e(s, {
                        children: e(F, {
                          label: "Nama Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Klinik",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "clinicEmail",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Email Klinik" }),
                      e(s, {
                        children: e(p, {
                          label: "Email Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email Klinik",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "clinicPhone",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "No Telp. Klinik" }),
                      e(s, {
                        children: e(S, {
                          label: "No Telp. Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "No Telp. Klinik",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "clinicAddress",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Alamat" }),
                      e(s, {
                        children: e(y, {
                          label: "Alamat",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Alamat",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "clinicCode",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(t, { children: "Kode Fasyankes" }),
                      e(s, {
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
              e(v, { styles: { root: {} }, size: 16 }),
              e(B, {
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
export { K as Form };
