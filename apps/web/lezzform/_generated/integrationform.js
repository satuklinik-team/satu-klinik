import { z as a } from "zod";
import {
  Lezzform as p,
  FormField as t,
  FormItem as s,
  FormLabel as l,
  FormControl as u,
  FormMessage as c,
  Input as F,
  PasswordInput as g,
  Button as C,
} from "@lezzform/react";
import * as n from "react";
import { jsx as e, jsxs as m } from "react/jsx-runtime";
var L = a.object({
    id: a.string(),
    token: a.string(),
    username: a.string(),
    password: a.string(),
  }),
  z = "ArmHq9lsD20Nls3dmd2c",
  P = ({
    onSubmit: i,
    onError: b,
    onSuccess: h,
    defaultValues: S,
    onAction: f,
    formProps: k,
  }) => {
    let d = n.useRef();
    n.useEffect(() => {
      i && (d.current = i);
    }, [i]);
    let R = n.useCallback(async (r, o) => {
      if (d.current) return d.current(r, o);
    }, []);
    return e(
      p,
      {
        id: z,
        defaultValues: S,
        onSubmit: R,
        onError: b,
        onSuccess: h,
        zodSchema: L,
        mode: "onSubmit",
        children: (r) =>
          m(p.Container, {
            children: [
              e(t, {
                control: r.control,
                name: "id",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      e(l, { isRequired: !0, children: "ID" }),
                      e(u, {
                        children: e(F, {
                          label: "ID",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "ID",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(t, {
                control: r.control,
                name: "token",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      e(l, { isRequired: !0, children: "Token" }),
                      e(u, {
                        children: e(F, {
                          label: "Token",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Token",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(t, {
                control: r.control,
                name: "username",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      e(l, { isRequired: !0, children: "Username" }),
                      e(u, {
                        children: e(F, {
                          label: "Username",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          placeholder: "Username",
                          disabled: o.disabled,
                          isRequired: !0,
                          styles: { root: {} },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(t, {
                control: r.control,
                name: "password",
                render: ({ field: o }) =>
                  m(s, {
                    children: [
                      e(l, { isRequired: !0, children: "Password" }),
                      e(u, {
                        children: e(g, {
                          label: "Password",
                          name: o.name,
                          value: o.value ?? "",
                          onBlur: o.onBlur,
                          onChange: o.onChange,
                          disabled: o.disabled,
                          placeholder: "Password",
                          isRequired: !0,
                          styles: { root: { marginBottom: 16 } },
                        }),
                      }),
                      e(c, {}),
                    ],
                  }),
              }),
              e(C, {
                type: "submit",
                className: "w-full",
                disabled: r.formState.isSubmitting,
                isLoading: r.formState.isSubmitting,
                styles: { root: { backgroundColor: "#2E584F" } },
                children: "Simpan",
              }),
            ],
          }),
      },
      z,
    );
  };
export { P as Form };
