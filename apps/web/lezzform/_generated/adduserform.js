import { z as a } from "zod";
import {
  Lezzform as b,
  FormField as m,
  FormItem as l,
  FormLabel as t,
  FormControl as s,
  FormMessage as u,
  Input as p,
  EmailInput as L,
  TextArea as w,
  Dropdown as v,
  PasswordInput as F,
  Spacer as y,
  TwoColumn as P,
  Button as h,
} from "@lezzform/react";
import { UserRound as A, Mail as k } from "lucide-react";
import * as i from "react";
import { jsx as e, jsxs as n } from "react/jsx-runtime";
var B = a.object({
    fullname: a.string(),
    email: a.string().email(),
    phone: a.string(),
    address: a.string(),
    role: a.string(),
    password: a.string().max(14).min(6),
    confirmPassword: a.string().max(14).min(6),
  }),
  R = "2J1DamYzvycoed2Fnb9x",
  D = ({
    onSubmit: c,
    onError: z,
    onSuccess: C,
    defaultValues: g,
    onAction: q,
    formProps: I,
  }) => {
    let d = i.useRef();
    i.useEffect(() => {
      c && (d.current = c);
    }, [c]);
    let S = i.useCallback(async (r, o) => {
      if (d.current) return d.current(r, o);
    }, []);
    return e(
      b,
      {
        id: R,
        defaultValues: g,
        onSubmit: S,
        onError: z,
        onSuccess: C,
        zodSchema: B,
        mode: "onSubmit",
        children: (r) =>
          n(b.Container, {
            children: [
              e(m, {
                control: r.control,
                name: "fullname",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Nama Lengkap" }),
                      e(s, {
                        children: e(p, {
                          label: "Nama Lengkap",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Lengkap",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(A, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "email",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Email" }),
                      e(s, {
                        children: e(L, {
                          label: "Email",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(k, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "phone",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Nomor Telepon" }),
                      e(s, {
                        children: e(p, {
                          label: "Nomor Telepon",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nomor Telepon",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "address",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Alamat" }),
                      e(s, {
                        children: e(w, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "role",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Role" }),
                      e(s, {
                        children: e(v.List, {
                          label: "Role",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          placeholder: "Role",
                          items: [
                            { label: "Admin", value: "SUPERADMIN" },
                            { label: "Dokter", value: "DOCTOR" },
                            { label: "Apoteker", value: "PHARMACY" },
                            { label: "Asisten", value: "ADMIN" },
                          ],
                          isRequired: !0,
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "password",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Password" }),
                      e(s, {
                        children: e(F, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: o }) =>
                  n(l, {
                    children: [
                      e(t, { isRequired: !0, children: "Konfirmasi Password" }),
                      e(s, {
                        children: e(F, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(y, { styles: { root: {} }, size: 16 }),
              n(P, {
                styles: { root: {} },
                children: [
                  e(h, {
                    type: "submit",
                    className: "w-full",
                    disabled: r.formState.isSubmitting,
                    isLoading: r.formState.isSubmitting,
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                  e(h, {
                    type: "reset",
                    className: "w-full",
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Reset",
                  }),
                ],
              }),
            ],
          }),
      },
      R,
    );
  };
export { D as Form };
