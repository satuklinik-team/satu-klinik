import { z as n } from "zod";
import {
  Lezzform as F,
  FormField as t,
  FormItem as s,
  FormLabel as l,
  FormControl as i,
  FormMessage as u,
  Input as d,
  PhoneNumberInput as C,
  NumberInput as S,
  Button as I,
} from "@lezzform/react";
import {
  Briefcase as L,
  CreditCard as y,
  Building as B,
  Phone as N,
} from "lucide-react";
import * as c from "react";
import { jsx as o, jsxs as a } from "react/jsx-runtime";
var P = n.object({
    licenseNumber: n.string(),
    clinicId: n.string(),
    clinicName: n.string(),
    phone: n
      .string()
      .max(14)
      .min(10)
      .refine(
        (m) =>
          !m ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(m),
        { message: "Invalid phone number format" },
      ),
    address: n.string(),
    price: n.coerce.number(),
  }),
  h = "jJtJWjd4ptrXPXrQHQbm",
  D = ({
    onSubmit: m,
    onError: p,
    onSuccess: g,
    defaultValues: z,
    onAction: f,
    formProps: k,
  }) => {
    let b = c.useRef();
    c.useEffect(() => {
      m && (b.current = m);
    }, [m]);
    let R = c.useCallback(async (r, e) => {
      if (b.current) return b.current(r, e);
    }, []);
    return o(
      F,
      {
        id: h,
        defaultValues: z,
        onSubmit: R,
        onError: p,
        onSuccess: g,
        zodSchema: P,
        mode: "onTouched",
        children: (r) =>
          a(F.Container, {
            children: [
              o(t, {
                control: r.control,
                name: "licenseNumber",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, {
                        isRequired: !0,
                        children: "ID Permit / ID Registrasi / Nomor Lisensi",
                      }),
                      o(i, {
                        children: o(d, {
                          label: "ID Permit  / ID Registrasi / Nomor Lisensi",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder:
                            "ID Permit  / ID Registrasi / Nomor Lisensi",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(L, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: r.control,
                name: "clinicId",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, { isRequired: !0, children: "Fasyankes ID" }),
                      o(i, {
                        children: o(d, {
                          label: "Fasyankes ID",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Fasyankes ID",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: o(y, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: r.control,
                name: "clinicName",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, { isRequired: !0, children: "Nama Klinik" }),
                      o(i, {
                        children: o(d, {
                          label: "Nama Klinik",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Nama Klinik",
                          disabled: e.disabled,
                          isRequired: !0,
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
                control: r.control,
                name: "phone",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, { isRequired: !0, children: "Nomor Telepon" }),
                      o(i, {
                        children: o(C, {
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
                            icon: o(N, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: r.control,
                name: "address",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, { isRequired: !0, children: "Alamat" }),
                      o(i, {
                        children: o(d, {
                          label: "Alamat",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "Alamat",
                          disabled: e.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(t, {
                control: r.control,
                name: "price",
                render: ({ field: e }) =>
                  a(s, {
                    children: [
                      o(l, { isRequired: !0, children: "Harga Dasar" }),
                      o(i, {
                        children: o(S, {
                          label: "Harga Dasar",
                          name: e.name,
                          value: e.value ?? 0,
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          disabled: e.disabled,
                          placeholder: "Harga Dasar",
                          isRequired: !0,
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      o(u, {}),
                    ],
                  }),
              }),
              o(I, {
                type: "submit",
                className: "w-full",
                disabled: r.formState.isSubmitting,
                isLoading: r.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Simpan Perubahan",
              }),
            ],
          }),
      },
      h,
    );
  };
export { D as Form };
