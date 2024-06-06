import { z as a } from "zod";
import {
  Lezzform as p,
  FormField as l,
  FormItem as u,
  FormLabel as c,
  FormControl as i,
  FormMessage as d,
  Input as w,
  PasswordInput as z,
  Spacer as R,
  Button as P,
} from "@lezzform/react";
import * as n from "react";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
var L = a.object({
    email: a.string(),
    password: a.string(),
    confirmPassword: a.string(),
  }),
  F = "jQLEE5SGkJz1lBgB6GaA",
  B = ({
    onSubmit: m,
    onError: h,
    onSuccess: S,
    defaultValues: b,
    onAction: y,
    formProps: g,
  }) => {
    let s = n.useRef();
    n.useEffect(() => {
      m && (s.current = m);
    }, [m]);
    let f = n.useCallback(async (r, o) => {
      if (s.current) return s.current(r, o);
    }, []);
    return e(
      p,
      {
        id: F,
        defaultValues: b,
        onSubmit: f,
        onError: h,
        onSuccess: S,
        zodSchema: L,
        mode: "onTouched",
        children: (r) =>
          t(p.Container, {
            children: [
              e(l, {
                control: r.control,
                name: "email",
                render: ({ field: o }) =>
                  t(u, {
                    children: [
                      e(c, { isRequired: !0, children: "Email" }),
                      e(i, {
                        children: e(w, {
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
                      e(d, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "password",
                render: ({ field: o }) =>
                  t(u, {
                    children: [
                      e(c, { isRequired: !0, children: "New Password" }),
                      e(i, {
                        children: e(z, {
                          label: "New Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "New Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(d, {}),
                    ],
                  }),
              }),
              e(l, {
                control: r.control,
                name: "confirmPassword",
                render: ({ field: o }) =>
                  t(u, {
                    children: [
                      e(c, { isRequired: !0, children: "Retype Password" }),
                      e(i, {
                        children: e(z, {
                          label: "Retype Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Retype Password",
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(d, {}),
                    ],
                  }),
              }),
              e(R, { styles: { root: {} }, size: 16 }),
              e(P, {
                type: "submit",
                className: "w-full",
                disabled: r.formState.isSubmitting,
                isLoading: r.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Reset Password",
              }),
            ],
          }),
      },
      F,
    );
  };
export { B as Form };
