import { z as t } from "zod";
import {
  Lezzform as F,
  FormField as a,
  FormItem as m,
  FormLabel as l,
  FormControl as u,
  FormMessage as s,
  Attachment as R,
  Dropdown as L,
  Input as v,
  NumberInput as p,
  TwoColumn as I,
  Button as h,
} from "@lezzform/react";
import { ChevronDown as k } from "lucide-react";
import * as c from "react";
import { jsx as e, jsxs as n } from "react/jsx-runtime";
var w = t.object({
    image: t.string(),
    categoryId: t.string(),
    title: t.string(),
    price: t.coerce.number().optional(),
    stock: t.coerce.number(),
    discount: t.coerce.number().optional(),
  }),
  g = "8VtJVBAlIEAVK4ZuxsLl",
  f = ({
    onSubmit: i,
    onError: z,
    onSuccess: C,
    defaultValues: y,
    onAction: B,
    formProps: P,
  }) => {
    let b = c.useRef();
    c.useEffect(() => {
      i && (b.current = i);
    }, [i]);
    let S = c.useCallback(async (r, o) => {
      if (b.current) return b.current(r, o);
    }, []);
    return e(
      F,
      {
        id: g,
        defaultValues: y,
        onSubmit: S,
        onError: z,
        onSuccess: C,
        zodSchema: w,
        mode: "onTouched",
        children: (r) =>
          n(F.Container, {
            children: [
              e(a, {
                control: r.control,
                name: "image",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Image" }),
                      e(u, {
                        children: e(R, {
                          label: "Image",
                          name: o.name,
                          value: o.value,
                          onChange: (d) => {
                            o.onChange(d), r.clearErrors(o.name);
                          },
                          disabled: o.disabled,
                          placeholder: "",
                          acceptedFormats: ["image/jpeg", "image/png"],
                          maxSize: 2048,
                          headers: [],
                          onError: (d) => {
                            r.setError(o.name, { message: d });
                          },
                          path: { value: "" },
                          url: "",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(s, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "categoryId",
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
                          placeholder: "Category",
                          items: [
                            { label: "Option 1", value: "option1" },
                            { label: "Option 2", value: "option2" },
                            { label: "Option 3", value: "option3" },
                          ],
                          isRequired: !0,
                          disabled: o.disabled,
                          styles: { root: {} },
                          suffixAdornment: {
                            icon: e(k, { size: 18, color: "#000000" }),
                          },
                        }),
                      }),
                      e(s, {}),
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
                        children: e(v, {
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
                      e(s, {}),
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
                        children: e(p, {
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
                      e(s, {}),
                    ],
                  }),
              }),
              e(a, {
                control: r.control,
                name: "stock",
                render: ({ field: o }) =>
                  n(m, {
                    children: [
                      e(l, { isRequired: !0, children: "Quantity" }),
                      e(u, {
                        children: e(p, {
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
                      e(s, {}),
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
                        children: e(p, {
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
                      e(s, {}),
                    ],
                  }),
              }),
              n(I, {
                styles: { root: {} },
                children: [
                  e(h, {
                    type: "reset",
                    className: "w-full",
                    styles: { root: { backgroundColor: "rgb(239, 68, 68)" } },
                    children: "Reset",
                  }),
                  e(h, {
                    type: "submit",
                    className: "w-full",
                    disabled: r.formState.isSubmitting,
                    isLoading: r.formState.isSubmitting,
                    styles: { root: { backgroundColor: "#2E584F" } },
                    children: "Submit",
                  }),
                ],
              }),
            ],
          }),
      },
      g,
    );
  };
export { f as Form };
