import { z as a } from "zod";
import {
  Lezzform as c,
  FormField as F,
  FormItem as S,
  FormLabel as p,
  FormControl as d,
  FormMessage as h,
  Text as b,
  Input as L,
  Button as R,
} from "@lezzform/react";
import * as e from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
var y = a.object({ name: a.string().optional() }),
  u = "nFK1q7NCJ7fFFeHFdd22",
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
        zodSchema: y,
        mode: "onSubmit",
        children: (n) =>
          s(c.Container, {
            children: [
              o(b.Heading2, { styles: { root: {} }, children: "SOAPForm" }),
              o(F, {
                control: n.control,
                name: "name",
                render: ({ field: r }) =>
                  s(S, {
                    children: [
                      o(p, { children: "Name" }),
                      o(d, {
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
                      o(h, {}),
                    ],
                  }),
              }),
              o(R, {
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
