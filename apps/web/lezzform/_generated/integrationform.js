import { z as a } from "zod";
import {
  Lezzform as S,
  FormField as t,
  FormItem as s,
  FormLabel as l,
  FormControl as u,
  FormMessage as c,
  Input as F,
  PasswordInput as L,
  Button as C,
} from "@lezzform/react";
import * as n from "react";
import { jsx as r, jsxs as m } from "react/jsx-runtime";
var f = a.object({
    name: a.string().optional(),
    "name-oSh": a.string().optional(),
    "name-oSh-5Su": a.string().optional(),
    "passwordInput-1713880776428": a.string().optional(),
  }),
  h = "NpSkWUy4XDm18yx8Lca3",
  I = ({
    onSubmit: i,
    onError: z,
    onSuccess: b,
    defaultValues: d,
    onAction: y,
    formProps: k,
  }) => {
    let p = n.useRef();
    n.useEffect(() => {
      i && (p.current = i);
    }, [i]);
    let g = n.useCallback(async (e, o) => {
      if (p.current) return p.current(e, o);
    }, []);
    return r(
      S,
      {
        id: h,
        defaultValues: d,
        onSubmit: g,
        onError: z,
        onSuccess: b,
        zodSchema: f,
        mode: "onSubmit",
        children: (e) =>
          m(S.Container, {
            children: [
              r(t, {
                control: e.control,
                name: "name",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      r(l, { children: "ID" }),
                      r(u, {
                        children: r(F, {
                          label: "ID",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "ID",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      r(c, {}),
                    ],
                  }),
              }),
              r(t, {
                control: e.control,
                name: "name-oSh",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      r(l, { children: "Token" }),
                      r(u, {
                        children: r(F, {
                          label: "Token",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Token",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      r(c, {}),
                    ],
                  }),
              }),
              r(t, {
                control: e.control,
                name: "name-oSh-5Su",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      r(l, { children: "Username" }),
                      r(u, {
                        children: r(F, {
                          label: "Username",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Username",
                          disabled: o.disabled,
                          styles: { root: {} },
                        }),
                      }),
                      r(c, {}),
                    ],
                  }),
              }),
              r(t, {
                control: e.control,
                name: "passwordInput-1713880776428",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      r(l, { children: "Password" }),
                      r(u, {
                        children: r(L, {
                          label: "Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Password",
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      r(c, {}),
                    ],
                  }),
              }),
              r(C, {
                type: "submit",
                className: "w-full",
                disabled: e.formState.isSubmitting,
                isLoading: e.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Simpan",
              }),
            ],
          }),
      },
      h,
    );
  };
export { I as Form };