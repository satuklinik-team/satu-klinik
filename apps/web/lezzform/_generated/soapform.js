import { z as a } from "zod";
import {
  Lezzform as c,
  FormField as S,
  FormItem as F,
  FormLabel as p,
  FormControl as h,
  FormMessage as d,
  Text as b,
  Input as L,
  Button as R,
} from "@lezzform/react";
import * as e from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
var y = a.object({ name: a.string().optional() }),
  u = "S5NcuaKklp4snwf1n2HM",
  C = ({
    onSubmit: m,
    onError: i,
    onSuccess: l,
    defaultValues: f,
    onAction: P,
    formProps: k,
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
              o(S, {
                control: n.control,
                name: "name",
                render: ({ field: r }) =>
                  s(F, {
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
      u
    );
  };
export { C as Form };
