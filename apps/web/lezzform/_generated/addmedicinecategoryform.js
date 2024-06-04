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
import * as r from "react";
import { jsx as e, jsxs as s } from "react/jsx-runtime";
var R = a.object({ name: a.string() }),
  c = "V0EIdlmlQ0MGgn9e1pfC",
  P = ({
    onSubmit: m,
    onError: i,
    onSuccess: l,
    defaultValues: f,
    onAction: y,
    formProps: g,
  }) => {
    let t = r.useRef();
    r.useEffect(() => {
      m && (t.current = m);
    }, [m]);
    let z = r.useCallback(async (n, o) => {
      if (t.current) return t.current(n, o);
    }, []);
    return e(
      u,
      {
        id: c,
        defaultValues: f,
        onSubmit: z,
        onError: i,
        onSuccess: l,
        zodSchema: R,
        mode: "onTouched",
        children: (n) =>
          s(u.Container, {
            children: [
              e(F, {
                control: n.control,
                name: "name",
                render: ({ field: o }) =>
                  s(S, {
                    children: [
                      e(p, { isRequired: !0, children: "Name" }),
                      e(d, {
                        children: e(b, {
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
                      e(h, {}),
                    ],
                  }),
              }),
              e(L, {
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
export { P as Form };
