import { z as a } from "zod";
import {
  Lezzform as p,
  FormField as l,
  FormItem as u,
  FormLabel as c,
  FormControl as i,
  FormMessage as d,
  Input as w,
  PasswordInput as F,
  Spacer as R,
  Button as P,
} from "@lezzform/react";
import * as n from "react";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
var y = a.object({
    email: a.string(),
    password: a.string(),
    confirmPassword: a.string(),
  }),
  z = "1uUoKpqIX0uOybJPMKlK",
  v = ({
    onSubmit: m,
    onError: h,
    onSuccess: b,
    defaultValues: S,
    onAction: L,
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
        id: z,
        defaultValues: S,
        onSubmit: f,
        onError: h,
        onSuccess: b,
        zodSchema: y,
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
                        children: e(F, {
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
                        children: e(F, {
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
      z,
    );
  };
export { v as Form };
