import { z as t } from "zod";
import {
  Lezzform as u,
  FormField as c,
  FormItem as l,
  FormLabel as i,
  FormControl as z,
  FormMessage as d,
  EmailInput as b,
  PasswordInput as R,
  Spacer as L,
  Button as g,
} from "@lezzform/react";
import * as n from "react";
import { jsx as r, jsxs as s } from "react/jsx-runtime";
var w = t.object({ email: t.string().email(), password: t.string() }),
  f = "VZaqTQMCusYcgb4gOiDJ",
  E = ({
    onSubmit: m,
    onError: p,
    onSuccess: F,
    defaultValues: S,
    onAction: P,
    formProps: y,
  }) => {
    let a = n.useRef();
    n.useEffect(() => {
      m && (a.current = m);
    }, [m]);
    let h = n.useCallback(async (e, o) => {
      if (a.current) return a.current(e, o);
    }, []);
    return r(
      u,
      {
        id: f,
        defaultValues: S,
        onSubmit: h,
        onError: p,
        onSuccess: F,
        zodSchema: w,
        mode: "onTouched",
        children: (e) =>
          s(u.Container, {
            children: [
              r(c, {
                control: e.control,
                name: "email",
                render: ({ field: o }) =>
                  s(l, {
                    children: [
                      r(i, { isRequired: !0, children: "Email" }),
                      r(z, {
                        children: r(b, {
                          label: "Email",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Email",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      r(d, {}),
                    ],
                  }),
              }),
              r(c, {
                control: e.control,
                name: "password",
                render: ({ field: o }) =>
                  s(l, {
                    children: [
                      r(i, { isRequired: !0, children: "Password" }),
                      r(z, {
                        children: r(R, {
                          label: "Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      r(d, {}),
                    ],
                  }),
              }),
              r(L, { styles: { root: {} }, size: 16 }),
              r(g, {
                type: "submit",
                className: "w-full",
                disabled: e.formState.isSubmitting,
                isLoading: e.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2e584f" } },
                children: "Masuk",
              }),
            ],
          }),
      },
      f,
    );
  };
export { E as Form };
