import { z as a } from "zod";
import {
  Lezzform as F,
  FormField as l,
  FormItem as u,
  FormLabel as c,
  FormControl as i,
  FormMessage as d,
  Input as f,
  PasswordInput as p,
  Spacer as w,
  Button as P,
} from "@lezzform/react";
import * as n from "react";
import { jsx as r, jsxs as t } from "react/jsx-runtime";
var y = a.object({
    email: a.string(),
    password: a.string(),
    confirmPassword: a.string(),
  }),
  z = "j1zqRERvrdJFVCvjVU4o",
  k = ({
    onSubmit: m,
    onError: h,
    onSuccess: R,
    defaultValues: S,
    onAction: L,
    formProps: C,
  }) => {
    let s = n.useRef();
    n.useEffect(() => {
      m && (s.current = m);
    }, [m]);
    let b = n.useCallback(async (e, o) => {
      if (s.current) return s.current(e, o);
    }, []);
    return r(
      F,
      {
        id: z,
        defaultValues: S,
        onSubmit: b,
        onError: h,
        onSuccess: R,
        zodSchema: y,
        mode: "onTouched",
        children: (e) =>
          t(F.Container, {
            children: [
              r(l, {
                control: e.control,
                name: "email",
                render: ({ field: o }) =>
                  t(u, {
                    children: [
                      r(c, { isRequired: !0, children: "Email" }),
                      r(i, {
                        children: r(f, {
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
                  t(u, {
                    children: [
                      r(c, { isRequired: !0, children: "New Password" }),
                      r(i, {
                        children: r(p, {
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
                      r(d, {}),
                    ],
                  }),
              }),
              r(l, {
                control: e.control,
                name: "confirmPassword",
                render: ({ field: o }) =>
                  t(u, {
                    children: [
                      r(c, { isRequired: !0, children: "Retype Password" }),
                      r(i, {
                        children: r(p, {
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
                      r(d, {}),
                    ],
                  }),
              }),
              r(w, { styles: { root: {} }, size: 16 }),
              r(P, {
                type: "submit",
                className: "w-full",
                disabled: e.formState.isSubmitting,
                isLoading: e.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Reset Password",
              }),
            ],
          }),
      },
      z
    );
  };
export { k as Form };
