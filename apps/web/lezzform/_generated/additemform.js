import { z as t } from "zod";
import {
  Lezzform as C,
  FormField as a,
  FormItem as m,
  FormLabel as l,
  FormControl as u,
  FormMessage as c,
  Attachment as L,
  Dropdown as I,
  Input as R,
  NumberInput as h,
  TwoColumn as P,
  Button as z,
} from "@lezzform/react";
import { ChevronDown as k } from "lucide-react";
import * as s from "react";
import { jsx as e, jsxs as r } from "react/jsx-runtime";
var w = t.object({
    "attachment-1713877181989": t.string().optional(),
    "singleSelect-1713877151261": t.string().optional(),
    "input-1713876922462": t.string().optional(),
    "numberInput-1713876810979": t.coerce.number().optional(),
    "numberInput-1713876818843": t.coerce.number().optional(),
    "numberInput-1713876836868": t.coerce.number().optional(),
  }),
  d = "ZCN52UR6Hn0xhSpDbRV6",
  f = ({
    onSubmit: i,
    onError: g,
    onSuccess: S,
    defaultValues: y,
    onAction: b,
    formProps: B,
  }) => {
    let p = s.useRef();
    s.useEffect(() => {
      i && (p.current = i);
    }, [i]);
    let v = s.useCallback(async (n, o) => {
      if (p.current) return p.current(n, o);
    }, []);
    return e(
      C,
      {
        id: d,
        defaultValues: y,
        onSubmit: v,
        onError: g,
        onSuccess: S,
        zodSchema: w,
        mode: "onSubmit",
        children: (n) =>
          r(C.Container, {
            children: [
              e(a, {
                control: n.control,
                name: "attachment-1713877181989",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Main Picture" }),
                      e(u, {
                        children: e(L, {
                          label: "Main Picture",
                          name: o.name,
                          value: o.value,
                          onChange: (F) => {
                            o.onChange(F), n.clearErrors(o.name);
                          },
                          disabled: o.disabled,
                          placeholder: "",
                          acceptedFormats: ["image/jpeg", "image/png"],
                          maxSize: 2048,
                          headers: [],
                          onError: (F) => {
                            n.setError(o.name, { message: F });
                          },
                          path: { value: "" },
                          url: "",
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: n.control,
                name: "singleSelect-1713877151261",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Category" }),
                      e(u, {
                        children: e(I, {
                          label: "Category",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          items: [
                            { label: "Option 1", value: "option1" },
                            { label: "Option 2", value: "option2" },
                            { label: "Option 3", value: "option3" },
                          ],
                          disabled: o.disabled,
                          styles: { root: {} },
                          suffixAdornment: {
                            icon: e(k, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: n.control,
                name: "input-1713876922462",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Title" }),
                      e(u, {
                        children: e(R, {
                          label: "Title",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Title",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: n.control,
                name: "numberInput-1713876810979",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Price" }),
                      e(u, {
                        children: e(h, {
                          label: "Price",
                          name: o.name,
                          value: o.value ?? 0,
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Price",
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: n.control,
                name: "numberInput-1713876818843",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Quantity" }),
                      e(u, {
                        children: e(h, {
                          label: "Quantity",
                          name: o.name,
                          value: o.value ?? 0,
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Quantity",
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: n.control,
                name: "numberInput-1713876836868",
                render: ({ field: o }) =>
                  r(m, {
                    children: [
                      e(l, { children: "Discount" }),
                      e(u, {
                        children: e(h, {
                          label: "Discount",
                          name: o.name,
                          value: o.value ?? 0,
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Discount",
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              r(P, {
                styles: { root: {} },
                children: [
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      b?.["button-1713876963119"] &&
                        b?.["button-1713876963119"](n);
                    },
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      b?.["button-1713876964678"] &&
                        b?.["button-1713876964678"](n);
                    },
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Reset",
                  }),
                ],
              }),
            ],
          }),
      },
      d
    );
  };
export { f as Form };