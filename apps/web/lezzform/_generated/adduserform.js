import { z as a } from "zod";
import {
  Lezzform as p,
  FormField as t,
  FormItem as m,
  FormLabel as l,
  FormControl as s,
  FormMessage as u,
  Input as F,
  EmailInput as v,
  TextArea as S,
  Dropdown as y,
  PasswordInput as h,
  Spacer as k,
  TwoColumn as P,
  Button as z,
} from "@lezzform/react";
import { UserRound as A, Mail as B } from "lucide-react";
import * as i from "react";
import { jsx as e, jsxs as n } from "react/jsx-runtime";
var q = a.object({
    fullName: a.string(),
    email: a.string().email(),
    phone: a.string(),
    address: a.string(),
    role: a.string(),
    password: a.string().max(14).min(6),
    confirmPassword: a.string().max(14).min(6),
  }),
  C = "mHzv9MJjICzIKd0UjX3L",
  T = ({
    onSubmit: d,
    onError: R,
    onSuccess: g,
    defaultValues: L,
    onAction: c,
    formProps: I,
  }) => {
    let b = i.useRef();
    i.useEffect(() => {
      d && (b.current = d);
    }, [d]);
    let w = i.useCallback(async (r, o) => {
      if (b.current) return b.current(r, o);
    }, []);
    return e(
      p,
      {
        id: C,
        defaultValues: L,
        onSubmit: w,
        onError: R,
        onSuccess: g,
        zodSchema: q,
        mode: "onSubmit",
        children: (r) =>
          n(p.Container, {
            children: [
              e(t, {
                control: r.control,
                name: "fullName",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Nama Lengkap" }),
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
                          prefixAdornment: {
                            icon: e(A, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: r.control,
                name: "email",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Email" }),
                      e(s, {
                        children: e(v, {
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
                            icon: e(B, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: r.control,
                name: "phone",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Nomor Telepon" }),
                      e(s, {
                        children: e(F, {
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
              e(t, {
                control: r.control,
                name: "address",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Alamat" }),
                      e(s, {
                        children: e(S, {
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
              e(t, {
                control: r.control,
                name: "role",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Role" }),
                      e(s, {
                        children: e(y.List, {
                          label: "Role",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          placeholder: "Role",
                          items: [
                            { label: "Admin", value: "Admin" },
                            { label: "Dokter", value: "Doctor" },
                            { label: "Apoteker", value: "Apoteker" },
                            { label: "Asisten", value: "Assistant" },
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
              e(t, {
                control: r.control,
                name: "password",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Password" }),
                      e(s, {
                        children: e(h, {
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
              e(t, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Konfirmasi Password" }),
                      e(s, {
                        children: e(h, {
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
              e(k, { styles: { root: {} }, size: 16 }),
              n(P, {
                styles: { root: {} },
                children: [
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      c?.["button-1713871145398"] &&
                        c?.["button-1713871145398"](r);
                    },
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      c?.["button-1713871147318"] &&
                        c?.["button-1713871147318"](r);
                    },
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Reset",
                  }),
                ],
              }),
            ],
          }),
      },
      C
    );
  };
export { T as Form };
