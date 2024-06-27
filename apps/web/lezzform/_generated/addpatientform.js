import { z as a } from "zod";
import {
  Lezzform as C,
  FormField as l,
  FormItem as t,
  FormLabel as m,
  FormControl as s,
  FormMessage as u,
  Input as b,
  Dropdown as p,
  DatePicker as q,
  PhoneNumberInput as I,
  TextArea as y,
  Divider as A,
  TwoColumn as g,
  ThreeColumn as N,
  Button as R,
  NumberInput as i,
} from "@lezzform/react";
import {
  CreditCard as v,
  User as k,
  Calendar as w,
  Phone as P,
} from "lucide-react";
import * as d from "react";
import { jsx as o, jsxs as r } from "react/jsx-runtime";
var T = a.object({
    norm: a.string().optional(),
    nik: a.string(),
    fullname: a.string(),
    sex: a.string(),
    blood: a.string(),
    birthAt: a.date(),
    phone: a
      .string()
      .max(14)
      .min(10)
      .refine(
        (c) =>
          !c ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(c),
        { message: "Invalid phone number format" }
      ),
    address: a.string(),
    height: a.coerce.number().optional(),
    weight: a.coerce.number().optional(),
    allergic: a.string(),
    systole: a.coerce.number(),
    diastole: a.coerce.number(),
    pulse: a.coerce.number(),
    respiration: a.coerce.number(),
    temperature: a.coerce.number(),
    pain: a.string(),
  }),
  B = "7M13nsOnuDk3AyNdGEHc",
  M = ({
    onSubmit: c,
    onError: F,
    onSuccess: L,
    defaultValues: z,
    onAction: D,
    formProps: x,
  }) => {
    let h = d.useRef();
    d.useEffect(() => {
      c && (h.current = c);
    }, [c]);
    let S = d.useCallback(async (n, e) => {
      if (h.current) return h.current(n, e);
    }, []);
    return o(
      C,
      {
        id: B,
        defaultValues: z,
        onSubmit: S,
        onError: F,
        onSuccess: L,
        zodSchema: T,
        mode: "onTouched",
        children: (n) =>
          r(C.Container, {
            children: [
              o(l, {
                control: n.control,
                name: "norm",
                disabled: !0,
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { children: "Nomor Rekam Medis" }),
                      o(s, {
                        children: o(b, {
                          label: "Nomor Rekam Medis",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Generated By System",
                          disabled: e.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(v, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "nik",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "NIK" }),
                      o(s, {
                        children: o(b, {
                          label: "NIK",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "NIK",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(v, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "fullname",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Nama" }),
                      o(s, {
                        children: o(b, {
                          label: "Nama",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nama",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(k, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "sex",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Jenis Kelamin" }),
                      o(s, {
                        children: o(p.List, {
                          label: "Jenis Kelamin",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          items: [
                            { label: "Laki-Laki", value: "male" },
                            { label: "Perempuan", value: "female" },
                          ],
                          isRequired: !0,
                          disabled: e.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "blood",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Golongan Darah" }),
                      o(s, {
                        children: o(p.List, {
                          label: "Golongan Darah",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          items: [
                            { label: "N/A", value: "N/A" },
                            { label: "A", value: "a" },
                            { label: "B", value: "b" },
                            { label: "AB", value: "ab" },
                            { label: "O", value: "o" },
                          ],
                          isRequired: !0,
                          disabled: e.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "birthAt",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Tanggal Lahir" }),
                      o(s, {
                        children: o(q, {
                          label: "Tanggal Lahir",
                          name: e.name,
                          value: e.value,
                          onChange: e.onChange,
                          placeholder: "dd/mm/yyyy",
                          format: "PPP",
                          isRequired: !0,
                          styles: { root: {} },
                          disabled: e.disabled,
                          prefixAdornment: {
                            icon: o(w, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "phone",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Nomor Telepon" }),
                      o(s, {
                        children: o(I, {
                          label: "Nomor Telepon",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Nomor Telepon",
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(P, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(l, {
                control: n.control,
                name: "address",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Alamat" }),
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
                      o(u, {}),
                    ],
                  }),
              }),
              o(A.Solid, { styles: { root: {} }, size: 2, color: "#E8E8E8" }),
              r(g, {
                styles: { root: {} },
                children: [
                  o(l, {
                    control: n.control,
                    name: "height",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { children: "Tinggi" }),
                          o(s, {
                            children: o(i, {
                              label: "Tinggi",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Tinggi dalam cm",
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                  o(l, {
                    control: n.control,
                    name: "weight",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { children: "Berat" }),
                          o(s, {
                            children: o(i, {
                              label: "Berat",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Berat dalam kg",
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                ],
              }),
              o(l, {
                control: n.control,
                name: "allergic",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Alergi" }),
                      o(s, {
                        children: o(b, {
                          label: "Alergi",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Alergi",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              r(g, {
                styles: { root: {} },
                children: [
                  o(l, {
                    control: n.control,
                    name: "systole",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { isRequired: !0, children: "Systole" }),
                          o(s, {
                            children: o(i, {
                              label: "Systole",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Systole",
                              isRequired: !0,
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                  o(l, {
                    control: n.control,
                    name: "diastole",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { isRequired: !0, children: "Diastole" }),
                          o(s, {
                            children: o(i, {
                              label: "Diastole",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Diastole",
                              isRequired: !0,
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                ],
              }),
              r(N, {
                styles: { root: {} },
                children: [
                  o(l, {
                    control: n.control,
                    name: "pulse",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { isRequired: !0, children: "Denyut Nadi" }),
                          o(s, {
                            children: o(i, {
                              label: "Denyut Nadi",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Denyut Nadi",
                              isRequired: !0,
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                  o(l, {
                    control: n.control,
                    name: "respiration",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { isRequired: !0, children: "Respirasi" }),
                          o(s, {
                            children: o(i, {
                              label: "Respirasi",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Respirasi",
                              isRequired: !0,
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                  o(l, {
                    control: n.control,
                    name: "temperature",
                    render: ({ field: e }) =>
                      r(t, {
                        children: [
                          o(m, { isRequired: !0, children: "Suhu" }),
                          o(s, {
                            children: o(i, {
                              label: "Suhu",
                              name: e.name,
                              value: e.value ?? 0,
                              onBlur: e.onBlur,
                              onChange: e.onChange,
                              disabled: e.disabled,
                              placeholder: "Suhu",
                              isRequired: !0,
                              styles: { root: {} },
                            }),
                          }),
                          o(u, {}),
                        ],
                      }),
                  }),
                ],
              }),
              o(l, {
                control: n.control,
                name: "pain",
                render: ({ field: e }) =>
                  r(t, {
                    children: [
                      o(m, { isRequired: !0, children: "Keluhan" }),
                      o(s, {
                        children: o(y, {
                          label: "Keluhan",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Keluhan",
                          isRequired: !0,
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              r(g, {
                styles: { root: {} },
                children: [
                  o(R, {
                    type: "reset",
                    className: "w-full",
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Batalkan",
                  }),
                  o(R, {
                    type: "submit",
                    className: "w-full",
                    disabled: n.formState.isSubmitting,
                    isLoading: n.formState.isSubmitting,
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Daftar",
                  }),
                ],
              }),
            ],
          }),
      },
      B
    );
  };
export { M as Form };
