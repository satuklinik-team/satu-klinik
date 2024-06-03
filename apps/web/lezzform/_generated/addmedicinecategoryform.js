import { z as a } from "zod";
import {
  Lezzform as u,
  FormField as S,
  FormItem as F,
  FormLabel as p,
  FormControl as d,
  FormMessage as h,
  Input as b,
  Button as L,
} from "@lezzform/react";
import * as e from "react";
import { jsx as r, jsxs as s } from "react/jsx-runtime";
var R = a.object({ name: a.string() }),
  c = "1Bp6P4kq6HvKeNp4SV1u",
  C = ({
    onSubmit: m,
    onError: i,
    onSuccess: l,
    defaultValues: f,
    onAction: k,
    formProps: y,
  }) => {
    let t = e.useRef();
    e.useEffect(() => {
      m && (t.current = m);
    }, [m]);
    let z = e.useCallback(async (n, o) => {
      if (t.current) return t.current(n, o);
    }, []);
    return r(
      u,
      {
        id: c,
        defaultValues: f,
        onSubmit: z,
        onError: i,
        onSuccess: l,
        zodSchema: R,
        mode: "onSubmit",
        children: (n) =>
          s(u.Container, {
            children: [
              r(S, {
                control: n.control,
                name: "name",
                render: ({ field: o }) =>
                  s(F, {
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
                disabled: n.formState.isSubmitting,
                isLoading: n.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Submit",
              }),
            ],
          }),
      },
      c,
    );
  };
export { C as Form };
