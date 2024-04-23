import { z as a } from "zod";
import {
  Lezzform as C,
  FormField as l,
  FormItem as t,
  FormLabel as m,
  FormControl as u,
  FormMessage as s,
  Input as h,
  Dropdown as v,
  DatePicker as k,
  PhoneNumberInput as R,
  TextArea as y,
  Divider as x,
  TwoColumn as d,
  ThreeColumn as A,
  Button as I,
  NumberInput as c,
} from "@lezzform/react";
import {
  CreditCard as B,
  User as P,
  Calendar as T,
  Phone as w,
} from "lucide-react";
import * as p from "react";
import { jsx as e, jsxs as n } from "react/jsx-runtime";
var D = a.object({
    name: a.string().optional(),
    "input-1713872945718": a.string().optional(),
    "input-1713873050433": a.string().optional(),
    "singleSelect-1713873093059": a.string().optional(),
    "singleSelect-1713873093059-92I": a.string().optional(),
    "datepicker-1713873339995": a.date().optional(),
    "phoneNumberInput-1713873372826": a
      .string()
      .max(14)
      .min(10)
      .refine(
        (b) =>
          !b ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(b),
        { message: "Invalid phone number format" }
      )
      .optional(),
    "textarea-1713873590984": a.string().optional(),
    "numberInput-1713874892095": a.coerce.number().optional(),
    "numberInput-1713874894502": a.coerce.number().optional(),
    "input-1713874751309": a.string().optional(),
    "numberInput-1713874946578": a.coerce.number().optional(),
    "numberInput-1713874949328": a.coerce.number().optional(),
    "numberInput-1713874970522": a.coerce.number().optional(),
    "numberInput-1713874972041": a.coerce.number().optional(),
    "numberInput-1713874973962": a.coerce.number().optional(),
    "textarea-1713874840335": a.string().optional(),
  }),
  z = "c9rJ7EiPbNFVGCBfluxY",
  J = ({
    onSubmit: b,
    onError: g,
    onSuccess: L,
    defaultValues: S,
    onAction: i,
    formProps: E,
  }) => {
    let F = p.useRef();
    p.useEffect(() => {
      b && (F.current = b);
    }, [b]);
    let N = p.useCallback(async (r, o) => {
      if (F.current) return F.current(r, o);
    }, []);
    return e(
      C,
      {
        id: z,
        defaultValues: S,
        onSubmit: N,
        onError: g,
        onSuccess: L,
        zodSchema: D,
        mode: "onSubmit",
        children: (r) =>
          n(C.Container, {
            children: [
              e(l, {
                control: r.control,
                name: "name",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Nomor Rekam Medis" }),
                      e(u, {
                        children: e(h, {
                          label: "Nomor Rekam Medis",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nomor Rekam Medis",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(B, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "input-1713872945718",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "NIK" }),
                      e(u, {
                        children: e(h, {
                          label: "NIK",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "NIK",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(B, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "input-1713873050433",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Nama" }),
                      e(u, {
                        children: e(h, {
                          label: "Nama",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(P, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "singleSelect-1713873093059",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Jenis Kelamin" }),
                      e(u, {
                        children: e(v.List, {
                          label: "Jenis Kelamin",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          items: [
                            { label: "Laki-Laki", value: "male" },
                            { label: "Perempuan", value: "female" },
                          ],
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "singleSelect-1713873093059-92I",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Golongan Darah" }),
                      e(u, {
                        children: e(v.List, {
                          label: "Golongan Darah",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          items: [
                            { label: "N/A", value: "empty" },
                            { label: "A", value: "a" },
                            { label: "B", value: "b" },
                            { label: "AB", value: "ab" },
                            { label: "O", value: "o" },
                          ],
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "datepicker-1713873339995",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Tanggal Lahir" }),
                      e(u, {
                        children: e(k, {
                          label: "Tanggal Lahir",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          placeholder: "dd/mm/yyyy",
                          format: "PPP",
                          styles: { root: {} },
                          disabled: o.disabled,
                          prefixAdornment: {
                            icon: e(T, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "phoneNumberInput-1713873372826",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Nomor Telepon" }),
                      e(u, {
                        children: e(R, {
                          label: "Nomor Telepon",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Nomor Telepon",
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(w, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "textarea-1713873590984",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Alamat" }),
                      e(u, {
                        children: e(y, {
                          label: "Alamat",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Nomor Telp",
                          styles: { root: {} },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(x.Solid, { styles: { root: {} }, size: 2, color: "#E8E8E8" }),
              n(d, {
                styles: { root: {} },
                children: [
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874892095",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Tinggi" }),
                          e(u, {
                            children: e(c, {
                              label: "Tinggi",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Tinggi dalam cm",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874894502",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Berat" }),
                          e(u, {
                            children: e(c, {
                              label: "Berat",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Berat dalam kg",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                ],
              }),
              e(l, {
                control: r.control,
                name: "input-1713874751309",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Alergi" }),
                      e(u, {
                        children: e(h, {
                          label: "Alergi",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Alergi",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              n(d, {
                styles: { root: {} },
                children: [
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874946578",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Systole" }),
                          e(u, {
                            children: e(c, {
                              label: "Systole",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Systole",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874949328",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Diastole" }),
                          e(u, {
                            children: e(c, {
                              label: "Diastole",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Diastole",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                ],
              }),
              n(A, {
                styles: { root: {} },
                children: [
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874970522",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Denyut Nadi" }),
                          e(u, {
                            children: e(c, {
                              label: "Denyut Nadi",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Denyut Nadi",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874972041",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Respirasi" }),
                          e(u, {
                            children: e(c, {
                              label: "Respirasi",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Respirasi",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                  e(l, {
                    control: r.control,
                    name: "numberInput-1713874973962",
                    render: ({ field: o }) =>
                      n(t, {
                        children: [
                          e(m, { children: "Suhu" }),
                          e(u, {
                            children: e(c, {
                              label: "Suhu",
                              name: o.name,
                              value: o.value ?? 0,
                              onBlur: o.onBlur,
                              onChange: o.onChange,
                              disabled: o.disabled,
                              placeholder: "Suhu",
                              styles: { root: {} },
                            }),
                          }),
                          e(s, {}),
                        ],
                      }),
                  }),
                ],
              }),
              e(l, {
                control: r.control,
                name: "textarea-1713874840335",
                render: ({ field: o }) =>
                  n(t, {
                    children: [
                      e(m, { children: "Keluhan" }),
                      e(u, {
                        children: e(y, {
                          label: "Keluhan",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Keluhan",
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              n(d, {
                styles: { root: {} },
                children: [
                  e(I, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      i?.["button-1713872929774"] &&
                        i?.["button-1713872929774"](r);
                    },
                    styles: {
                      root: { flex: 1, backgroundColor: "rgb(239, 68, 68)" },
                    },
                    children: "Batalkan",
                  }),
                  e(I, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      i?.["button-1713872927911"] &&
                        i?.["button-1713872927911"](r);
                    },
                    styles: { root: { flex: 1, backgroundColor: "#2E584F" } },
                    children: "Daftar",
                  }),
                ],
              }),
            ],
          }),
      },
      z
    );
  };
export { J as Form };
