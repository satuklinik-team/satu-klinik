import { z as n } from "zod";
import {
  Lezzform as h,
  FormField as l,
  FormItem as t,
  FormLabel as s,
  FormControl as i,
  FormMessage as u,
  Input as b,
  EmailInput as p,
  PhoneNumberInput as g,
  PasswordInput as S,
  Divider as k,
  TextArea as y,
  Spacer as P,
  Button as v,
} from "@lezzform/react";
import * as c from "react";
import { jsx as o, jsxs as a } from "react/jsx-runtime";
var B = n.object({
    fullname: n.string(),
    email: n.string().email(),
    password: n
      .string()
      .max(14)
      .min(6)
      .refine(
        (m) =>
          !m ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(m),
        { message: "Invalid phone number format" },
      ),
    confirmPassword: n.string().max(14).min(6),
    clinicName: n.string(),
    clinicEmail: n.string().email(),
    clinicPhone: n
      .string()
      .max(14)
      .min(10)
      .refine(
        (m) =>
          !m ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(m),
        { message: "Invalid phone number format" },
      ),
    clinicAddress: n.string(),
    clinicCode: n.string(),
  }),
  C = "Lxmwzr69pPeqqTEc3LJM",
  E = ({
    onSubmit: m,
    onError: d,
    onSuccess: R,
    defaultValues: z,
    onAction: q,
    formProps: w,
  }) => {
    let F = c.useRef();
    c.useEffect(() => {
      m && (F.current = m);
    }, [m]);
    let L = c.useCallback(async (r, e) => {
      if (F.current) return F.current(r, e);
    }, []);
    return o(
      h,
      {
        id: C,
        defaultValues: z,
        onSubmit: L,
        onError: d,
        onSuccess: R,
        zodSchema: B,
        mode: "onSubmit",
        children: (r) =>
          a(h.Container, {
            children: [
              o(l, {
                control: r.control,
                name: "fullname",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Nama Lengkap" }),
                      o(i, {
                        children: o(b, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "email",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Email" }),
                      o(i, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "password",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Password" }),
                      o(i, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Konfirmasi Password" }),
                      o(i, {
                        children: o(S, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(k.Solid, { styles: { root: {} }, size: 1, color: "#c7c7c7" }),
              o(l, {
                control: r.control,
                name: "clinicName",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Nama Klinik" }),
                      o(i, {
                        children: o(b, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "clinicEmail",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Email Klinik" }),
                      o(i, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "clinicPhone",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "No Telp. Klinik" }),
                      o(i, {
                        children: o(g, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "clinicAddress",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Alamat" }),
                      o(i, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: r.control,
                name: "clinicCode",
                render: ({ field: e }) =>
                  a(t, {
                    children: [
                      o(s, { isRequired: !0, children: "Kode Fasyankes" }),
                      o(i, {
                        children: o(b, {
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(P, { styles: { root: {} }, size: 16 }),
              o(v, {
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
      C,
    );
  };
export { E as Form };
