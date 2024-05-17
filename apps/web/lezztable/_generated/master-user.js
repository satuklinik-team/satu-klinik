import * as a from "react";
import { Table as r } from "@lezztable-demo/react";
import { Fragment as y, jsx as i } from "react/jsx-runtime";
var V = "a87d309f-18d8-4752-9f5e-419b1d5707d0",
  g = ({
    filters: b,
    sorts: u,
    groups: c,
    pagination: d,
    columns: n,
    headers: s,
    queryBuilder: m,
    onClick: k,
    data: l,
    onAction: C,
  }) => {
    let p = a.useMemo(
        () =>
          [
            {
              id: "0ea72889-94c1-47cf-ae00-3dbbd130bd14",
              key: "name",
              name: "Nama",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "c4ea6372-34dd-466c-8bb4-be05796b8ae2",
              key: "role",
              name: "Role",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "acba5c57-8bd3-4b1f-b2a3-76699477c4b5",
              key: "status",
              name: "Status",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "5bbf2003-01a5-4948-838c-3d46407d7052",
              key: "action",
              name: "Action",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
          ].map((e) => {
            let t = n?.find((f) => f?.key === e.key);
            return t ? { ...e, ...t } : e;
          }),
        [n]
      ),
      T = a.useMemo(() => {
        if (s) return Object.entries(s).map(([e, t]) => ({ key: e, value: t }));
      }, [s]),
      o = a.useMemo(
        () => ({
          type: "static",
          columns: [
            {
              id: "0ea72889-94c1-47cf-ae00-3dbbd130bd14",
              key: "name",
              name: "Nama",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "c4ea6372-34dd-466c-8bb4-be05796b8ae2",
              key: "role",
              name: "Role",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "acba5c57-8bd3-4b1f-b2a3-76699477c4b5",
              key: "status",
              name: "Status",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "5bbf2003-01a5-4948-838c-3d46407d7052",
              key: "action",
              name: "Action",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
          ],
          attributes: {
            data: [
              {
                id: "123121ee",
                role: "Admin",
                email: "admin@demo.id",
                phone: "082228883006",
                status: "Active",
                fullname: "Admin Demo",
              },
            ],
          },
        }),
        []
      );
    return i(y, {
      children: i(r, {
        filters: b ?? [],
        sorts: u ?? [],
        groups: c ?? [],
        pagination: d ?? {
          skip: 0,
          limit: 50,
          source: { key: "Limit", type: "header" },
        },
        queryBuilder: m,
        children: i(r.Grid, {
          id: "e4f187f7-f025-4b51-ba52-82e9f86a2b3f",
          columns: p,
          type: "static",
          attributes: { ...o.attributes, data: l ?? o.attributes.data },
        }),
      }),
    });
  };
export { V as TABLE_ID, g as Table };
