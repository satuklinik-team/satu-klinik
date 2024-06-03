import { z as a } from "zod";
import {
  Lezzform as u,
  FormField as F,
  FormItem as S,
  FormLabel as p,
  FormControl as d,
  FormMessage as h,
  Input as b,
  Button as L,
} from "@lezzform/react";
import * as e from "react";
import { jsx as r, jsxs as s } from "react/jsx-runtime";
var R = a.object({ name: a.string() }),
  c = "mN52yC40BDiG2fVkudN5",
  g = ({
    onSubmit: n,
    onError: i,
    onSuccess: f,
    defaultValues: l,
    onAction: y,
    formProps: k,
  }) => {
    let t = e.useRef();
    e.useEffect(() => {
      n && (t.current = n);
    }, [n]);
    let z = e.useCallback(async (m, o) => {
      if (t.current) return t.current(m, o);
    }, []);
    return r(
      u,
      {
        id: c,
        defaultValues: l,
        onSubmit: z,
        onError: i,
        onSuccess: f,
        zodSchema: R,
        mode: "onSubmit",
        children: (m) =>
          s(u.Container, {
            children: [
              r(F, {
                control: m.control,
                name: "name",
                render: ({ field: o }) =>
                  s(S, {
                    children: [
                      r(p, { isRequired: !0, children: "Name" }),
                      r(d, {
                        children: r(b, {
                          label: "Name",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Name",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      r(h, {}),
                    ],
                  }),
              }),
              r(L, {
                type: "submit",
                className: "w-full",
                disabled: m.formState.isSubmitting,
                isLoading: m.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Submit",
              }),
            ],
          }),
      },
      c
    );
  };
export { g as Form };
