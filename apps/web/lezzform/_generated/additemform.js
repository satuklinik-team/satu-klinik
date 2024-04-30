import { z as t } from "zod";
import {
  Lezzform as h,
  FormField as a,
  FormItem as m,
  FormLabel as l,
  FormControl as u,
  FormMessage as c,
  Attachment as v,
  Dropdown as L,
  Input as P,
  NumberInput as d,
  TwoColumn as k,
  Button as z,
} from "@lezzform/react";
import { ChevronDown as w } from "lucide-react";
import * as s from "react";
import { jsx as e, jsxs as n } from "react/jsx-runtime";
var q = t.object({
    "attachment-1713877181989": t.string(),
    category: t.string(),
    title: t.string(),
    price: t.coerce.number().optional(),
    quantity: t.coerce.number(),
    discount: t.coerce.number().optional(),
  }),
  C = "ceOgbQVENRbWKaIYdqRP",
  f = ({
    onSubmit: b,
    onError: g,
    onSuccess: y,
    defaultValues: R,
    onAction: i,
    formProps: B,
  }) => {
    let p = s.useRef();
    s.useEffect(() => {
      b && (p.current = b);
    }, [b]);
    let S = s.useCallback(async (r, o) => {
      if (p.current) return p.current(r, o);
    }, []);
    return e(
      h,
      {
        id: C,
        defaultValues: R,
        onSubmit: S,
        onError: g,
        onSuccess: y,
        zodSchema: q,
        mode: "onSubmit",
        children: (r) =>
          n(h.Container, {
            children: [
              e(a, {
                control: r.control,
                name: "attachment-1713877181989",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Main Picture" }),
                      e(u, {
                        children: e(v, {
                          label: "Main Picture",
                          name: o.name,
                          value: o.value,
                          onChange: (F) => {
                            o.onChange(F), r.clearErrors(o.name);
                          },
                          disabled: o.disabled,
                          placeholder: "",
                          acceptedFormats: ["image/jpeg", "image/png"],
                          maxSize: 2048,
                          headers: [],
                          onError: (F) => {
                            r.setError(o.name, { message: F });
                          },
                          path: { value: "" },
                          url: "",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "category",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Category" }),
                      e(u, {
                        children: e(L, {
                          label: "Category",
                          name: o.name,
                          value: o.value,
                          onChange: o.onChange,
                          items: [
                            { label: "Option 1", value: "option1" },
                            { label: "Option 2", value: "option2" },
                            { label: "Option 3", value: "option3" },
                          ],
                          isRequired: !0,
                          disabled: o.disabled,
                          styles: { root: {} },
                          suffixAdornment: {
                            icon: e(w, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "title",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Title" }),
                      e(u, {
                        children: e(P, {
                          label: "Title",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Title",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "price",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { children: "Price" }),
                      e(u, {
                        children: e(d, {
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
                control: r.control,
                name: "quantity",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Quantity" }),
                      e(u, {
                        children: e(d, {
                          label: "Quantity",
                          name: o.name,
                          value: o.value ?? 0,
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Quantity",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "discount",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { children: "Discount" }),
                      e(u, {
                        children: e(d, {
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
              n(k, {
                styles: { root: {} },
                children: [
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      i?.["button-1713876963119"] &&
                        i?.["button-1713876963119"](r);
                    },
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                  e(z, {
                    type: "button",
                    className: "w-full",
                    onClick: () => {
                      i?.["button-1713876964678"] &&
                        i?.["button-1713876964678"](r);
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
export { f as Form };
