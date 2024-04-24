import { z as n } from "zod";
import {
  Lezzform as h,
  FormField as m,
  FormItem as l,
  FormLabel as s,
  FormControl as u,
  FormMessage as i,
  Input as p,
  PhoneNumberInput as I,
  NumberInput as S,
  Button as L,
} from "@lezzform/react";
import {
  Briefcase as y,
  CreditCard as B,
  Building as R,
  Phone as k,
} from "lucide-react";
import * as c from "react";
import { jsx as e, jsxs as a } from "react/jsx-runtime";
var f = n.object({
    "input-1713880139587": n.string().optional(),
    "input-1713880141267": n.string().optional(),
    "input-1713880143659": n.string().optional(),
    "phoneNumberInput-1713880247470": n
      .string()
      .max(14)
      .min(10)
      .refine(
        (t) =>
          !t ||
          /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(t),
        { message: "Invalid phone number format" }
      )
      .optional(),
    "input-1713880241782": n.string().optional(),
    "numberInput-1713880284230": n.coerce.number().optional(),
  }),
  d = "MEvpiI9J9NjeucsY6ekW",
  x = ({
    onSubmit: t,
    onError: F,
    onSuccess: g,
    defaultValues: z,
    onAction: v,
    formProps: N,
  }) => {
    let b = c.useRef();
    c.useEffect(() => {
      t && (b.current = t);
    }, [t]);
    let C = c.useCallback(async (r, o) => {
      if (b.current) return b.current(r, o);
    }, []);
    return e(
      h,
      {
        id: d,
        defaultValues: z,
        onSubmit: C,
        onError: F,
        onSuccess: g,
        zodSchema: f,
        mode: "onSubmit",
        children: (r) =>
          a(h.Container, {
            children: [
              e(m, {
                control: r.control,
                name: "input-1713880139587",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, {
                        children: "ID Permit / ID Registrasi / Nomor Lisensi",
                      }),
                      e(u, {
                        children: e(p, {
                          label: "ID Permit  / ID Registrasi / Nomor Lisensi",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder:
                            "ID Permit  / ID Registrasi / Nomor Lisensi",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(y, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "input-1713880141267",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Fasyankes ID" }),
                      e(u, {
                        children: e(p, {
                          label: "Fasyankes ID",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Fasyankes ID",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(B, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "input-1713880143659",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Nama Klinik" }),
                      e(u, {
                        children: e(p, {
                          label: "Nama Klinik",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Nama Klinik",
                          disabled: o.disabled,
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(R, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "phoneNumberInput-1713880247470",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Nomor Telepon" }),
                      e(u, {
                        children: e(I, {
                          label: "Nomor Telepon",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Nomor Telepon",
                          styles: { root: {} },
                          prefixAdornment: {
                            icon: e(k, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "input-1713880241782",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Alamat" }),
                      e(u, {
                        children: e(p, {
                          label: "Alamat",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Alamat",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(m, {
                control: r.control,
                name: "numberInput-1713880284230",
                render: ({ field: o }) =>
                  a(l, {
                    children: [
                      e(s, { children: "Harga Dasar" }),
                      e(u, {
                        children: e(S, {
                          label: "Harga Dasar",
                          name: o.name,
                          value: o.value ?? 0,
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Harga Dasar",
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      e(i, {}),
                    ],
                  }),
              }),
              e(L, {
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
      d
    );
  };
export { x as Form };
