import { z as a } from "zod";
import {
  Lezzform as F,
  FormField as t,
  FormItem as l,
  FormLabel as m,
  FormControl as s,
  FormMessage as u,
  Input as d,
  Dropdown as g,
  DatePicker as k,
  PhoneNumberInput as N,
  TextArea as I,
  TwoColumn as R,
  Button as C,
} from "@lezzform/react";
import {
  CreditCard as z,
  User as B,
  Calendar as P,
  Phone as A,
} from "lucide-react";
import * as i from "react";
import { jsx as o, jsxs as r } from "react/jsx-runtime";
var w = a.object({
    "input-1713924229907": a.string().optional(),
    "input-1713924232759": a.string().optional(),
    "input-1713924236229": a.string().optional(),
    "singleSelect-1713924285420": a.string().optional(),
    "singleSelect-1713924373568": a.string().optional(),
    "datepicker-1713924594975": a.date().optional(),
    "phoneNumberInput-1713924635725": a
      .string()
      .max(14)
      .min(10)
      .refine(
        (c) =>
          !c ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(c),
        { message: "Invalid phone number format" },
      )
      .optional(),
    "textarea-1713924663412": a.string().optional(),
  }),
  v = "gkChi270oYhdqT0WHW7d",
  K = ({
    onSubmit: c,
    onError: h,
    onSuccess: y,
    defaultValues: L,
    onAction: b,
    formProps: x,
  }) => {
    let p = i.useRef();
    i.useEffect(() => {
      c && (p.current = c);
    }, [c]);
    let S = i.useCallback(async (n, e) => {
      if (p.current) return p.current(n, e);
    }, []);
    return o(
      F,
      {
        id: v,
        defaultValues: L,
        onSubmit: S,
        onError: h,
        onSuccess: y,
        zodSchema: w,
        mode: "onSubmit",
        children: (n) =>
          r(F.Container, {
            children: [
              o(t, {
                control: n.control,
                name: "input-1713924229907",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Nomor Rekam Medis" }),
                      o(s, {
                        children: o(d, {
                          label: "Nomor Rekam Medis",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nomor Rekam Medis",
                          disabled: e.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(z, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "input-1713924232759",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "NIK" }),
                      o(s, {
                        children: o(d, {
                          label: "NIK",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "NIK",
                          disabled: e.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(z, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "input-1713924236229",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Nama" }),
                      o(s, {
                        children: o(d, {
                          label: "Nama",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nama",
                          disabled: e.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(B, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "singleSelect-1713924285420",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Jenis Kelamin" }),
                      o(s, {
                        children: o(g.List, {
                          label: "Jenis Kelamin",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          items: [
                            { label: "Laki-laki", value: "male" },
                            { label: "Perempuan", value: "female" },
                          ],
                          disabled: e.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "singleSelect-1713924373568",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Golongan Darah" }),
                      o(s, {
                        children: o(g.List, {
                          label: "Golongan Darah",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          items: [
                            { label: "empty", value: "N/A" },
                            { label: "A", value: "a" },
                            { label: "B", value: "b" },
                            { label: "AB", value: "ab" },
                            { label: "O", value: "o" },
                          ],
                          disabled: e.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "datepicker-1713924594975",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Tanggal Lahir" }),
                      o(s, {
                        children: o(k, {
                          label: "Tanggal Lahir",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          placeholder: "dd/mm/yyyy",
                          format: "PPP",
                          styles: { root: {} },
                          disabled: e.disabled,
                          prefixAdornment: {
                            icon: o(P, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "phoneNumberInput-1713924635725",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Nomor Telepon" }),
                      o(s, {
                        children: o(N, {
                          label: "Nomor Telepon",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Nomor Telepon",
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(A, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: n.control,
                name: "textarea-1713924663412",
                render: ({ field: e }) =>
                  r(l, {
                    children: [
                      o(m, { children: "Alamat" }),
                      o(s, {
                        children: o(I, {
                          label: "Alamat",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Alamat",
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              r(R, {
                styles: { root: {} },
                children: [
                  o(C, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      b?.["button-1713924193321"] &&
                        b?.["button-1713924193321"](n);
                    },
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Batalkan",
                  }),
                  o(C, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      b?.["button-1713924197611"] &&
                        b?.["button-1713924197611"](n);
                    },
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Daftar",
                  }),
                ],
              }),
            ],
          }),
      },
      v,
    );
  };
export { K as Form };
