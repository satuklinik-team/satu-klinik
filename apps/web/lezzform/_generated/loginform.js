import { z as a } from "zod";
import {
  Lezzform as u,
  FormField as l,
  FormItem as c,
  FormLabel as i,
  FormControl as z,
  FormMessage as d,
  EmailInput as b,
  PasswordInput as R,
  Spacer as y,
  Button as L,
} from "@lezzform/react";
import * as n from "react";
import { jsx as r, jsxs as s } from "react/jsx-runtime";
var P = a.object({ email: a.string().email(), password: a.string() }),
  F = "Gw0KtEdMUFUJq65SRmhB",
  E = ({
    onSubmit: m,
    onError: p,
    onSuccess: F,
    defaultValues: S,
    onAction: y,
    formProps: g,
  }) => {
    let t = n.useRef();
    n.useEffect(() => {
      m && (t.current = m);
    }, [m]);
    let h = n.useCallback(async (e, o) => {
      if (t.current) return t.current(e, o);
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
        mode: "onSubmit",
        children: (e) =>
          s(u.Container, {
            children: [
              r(l, {
                control: e.control,
                name: "email",
                render: ({ field: o }) =>
                  s(c, {
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
              r(l, {
                control: e.control,
                name: "password",
                render: ({ field: o }) =>
                  s(c, {
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
              r(y, { styles: { root: {} }, size: 16 }),
              r(L, {
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
