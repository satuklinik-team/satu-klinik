import { z as a } from "zod";
import {
  Lezzform as c,
  FormField as F,
  FormItem as S,
  FormLabel as p,
  FormControl as h,
  FormMessage as b,
  Text as d,
  Input as L,
  Button as y,
} from "@lezzform/react";
import * as e from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
var R = a.object({ name: a.string().optional() }),
  u = "1Wy7YbC0mUUx4yfIFHRv",
  w = ({
    onSubmit: m,
    onError: i,
    onSuccess: l,
    defaultValues: f,
    onAction: P,
    formProps: g,
  }) => {
    let t = e.useRef();
    e.useEffect(() => {
      m && (t.current = m);
    }, [m]);
    let z = e.useCallback(async (n, r) => {
      if (t.current) return t.current(n, r);
    }, []);
    return o(
      c,
      {
        id: u,
        defaultValues: f,
        onSubmit: z,
        onError: i,
        onSuccess: l,
        zodSchema: R,
        mode: "onSubmit",
        children: (n) =>
          s(c.Container, {
            children: [
              o(d.Heading2, { styles: { root: {} }, children: "SOAPForm" }),
              o(F, {
                control: n.control,
                name: "name",
                render: ({ field: r }) =>
                  s(S, {
                    children: [
                      o(p, { children: "Name" }),
                      o(h, {
                        children: o(L, {
                          label: "Name",
                          name: r.name,
                          value: r.value ?? "",
                          onBlur: r.onBlur,
                          onChange: r.onChange,
                          placeholder: "",
                          disabled: r.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(b, {}),
                    ],
                  }),
              }),
              o(y, {
                type: "submit",
                className: "w-full",
                disabled: n.formState.isSubmitting,
                isLoading: n.formState.isSubmitting,
                styles: { root: {} },
                children: "Submit",
              }),
            ],
          }),
      },
      u,
    );
  };
export { w as Form };
