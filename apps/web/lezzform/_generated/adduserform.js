import { z as a } from "zod";
import {
  Lezzform as F,
  FormField as t,
  FormItem as l,
  FormLabel as m,
  FormControl as s,
  FormMessage as u,
  Input as d,
  EmailInput as v,
  TextArea as y,
  Dropdown as k,
  PasswordInput as h,
  Spacer as R,
  TwoColumn as I,
  Button as z,
} from "@lezzform/react";
import { UserRound as A, Mail as B } from "lucide-react";
import * as c from "react";
import { jsx as e, jsxs as r } from "react/jsx-runtime";
var P = a.object({
    name: a.string().optional(),
    "emailInput-1713871204480": a.string().email().optional(),
    "input-1713871261634": a.string().optional(),
    "textarea-1713871376397": a.string().optional(),
    "singleSelect-1713871528625": a.string().optional(),
    "passwordInput-1713871400734": a.string().optional(),
    "passwordInput-1713871418205": a.string().optional(),
  }),
  C = "7985HgGER9ABwFxzTuk4",
  O = ({
    onSubmit: i,
    onError: g,
    onSuccess: w,
    defaultValues: S,
    onAction: p,
    formProps: E,
  }) => {
    let b = c.useRef();
    c.useEffect(() => {
      i && (b.current = i);
    }, [i]);
    let L = c.useCallback(async (n, o) => {
      if (b.current) return b.current(n, o);
    }, []);
    return e(
      F,
      {
        id: C,
        defaultValues: S,
        onSubmit: L,
        onError: g,
        onSuccess: w,
        zodSchema: P,
        mode: "onSubmit",
        children: (n) =>
          r(F.Container, {
            children: [
              e(t, {
                control: n.control,
                name: "name",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Nama Lengkap" }),
                      e(s, {
                        children: e(d, {
                          label: "Nama Lengkap",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Lengkap",
                          disabled: o.disabled,
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
                control: n.control,
                name: "emailInput-1713871204480",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Email" }),
                      e(s, {
                        children: e(v, {
                          label: "Email",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email",
                          disabled: o.disabled,
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
                control: n.control,
                name: "input-1713871261634",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Nomor Telepon" }),
                      e(s, {
                        children: e(d, {
                          label: "Nomor Telepon",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nomor Telepon",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: n.control,
                name: "textarea-1713871376397",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Alamat" }),
                      e(s, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: n.control,
                name: "singleSelect-1713871528625",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Role" }),
                      e(s, {
                        children: e(k.List, {
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
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: n.control,
                name: "passwordInput-1713871400734",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Password" }),
                      e(s, {
                        children: e(h, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(t, {
                control: n.control,
                name: "passwordInput-1713871418205",
                render: ({ field: o }) =>
                  r(l, {
                    children: [
                      e(m, { children: "Konfirmasi Password" }),
                      e(s, {
                        children: e(h, {
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
                      e(u, {}),
                    ],
                  }),
              }),
              e(R, { styles: { root: {} }, size: 16 }),
              r(I, {
                styles: { root: {} },
                children: [
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      p?.["button-1713871145398"] &&
                        p?.["button-1713871145398"](n);
                    },
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      p?.["button-1713871147318"] &&
                        p?.["button-1713871147318"](n);
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
export { O as Form };
