import { z as a } from "zod";
import {
  Lezzform as c,
  FormField as F,
  FormItem as S,
  FormLabel as h,
  FormControl as p,
  FormMessage as d,
  Text as b,
  Input as L,
  Button as R,
} from "@lezzform/react";
import * as r from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
var y = a.object({ name: a.string().optional() }),
  u = "IUahhwihQw4eqn7lfkVk",
  C = ({
    onSubmit: m,
    onError: i,
    onSuccess: l,
    defaultValues: f,
    onAction: k,
    formProps: P,
  }) => {
    let t = r.useRef();
    r.useEffect(() => {
      m && (t.current = m);
    }, [m]);
    let z = r.useCallback(async (n, e) => {
      if (t.current) return t.current(n, e);
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
        mode: "onTouched",
        children: (n) =>
          s(c.Container, {
            children: [
              o(b.Heading2, { styles: { root: {} }, children: "SOAPForm" }),
              o(F, {
                control: n.control,
                name: "name",
                render: ({ field: e }) =>
                  s(S, {
                    children: [
                      o(h, { children: "Name" }),
                      o(p, {
                        children: o(L, {
                          label: "Name",
                          name: e.name,
                          value: e.value ?? "",
                          onBlur: e.onBlur,
                          onChange: e.onChange,
                          placeholder: "",
                          disabled: e.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      o(d, {}),
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
export { C as Form };
