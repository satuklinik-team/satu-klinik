import * as i from "react";
import { Table as r } from "@lezztable-demo/react";
import { Fragment as y, jsx as s } from "react/jsx-runtime";
var h = "a7b9253f-504c-41a1-8920-a3551a0343fd",
  R = ({
    filters: c,
    sorts: u,
    groups: m,
    pagination: l,
    columns: n,
    headers: a,
    queryBuilder: b,
    onClick: f,
    data: d,
    onAction: T,
  }) => {
    let p = i.useMemo(
        () =>
          [
            {
              key: "clinic",
              name: "Klinik",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "9e46c826-89f3-49c0-b494-b6113a21814d",
              key: "statistics",
              name: "Statistik",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "b8e23288-a834-49c9-a65d-ed322b53d75a",
              key: "actions",
              name: "Actions",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
          ].map((e) => {
            let t = n?.find((k) => k?.key === e.key);
            return t ? { ...e, ...t } : e;
          }),
        [n]
      ),
      C = i.useMemo(() => {
        if (a) return Object.entries(a).map(([e, t]) => ({ key: e, value: t }));
      }, [a]),
      o = i.useMemo(
        () => ({
          type: "static",
          columns: [
            {
              key: "clinic",
              name: "Klinik",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "9e46c826-89f3-49c0-b494-b6113a21814d",
              key: "statistics",
              name: "Statistik",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              id: "b8e23288-a834-49c9-a65d-ed322b53d75a",
              key: "actions",
              name: "Actions",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
          ],
          attributes: {
            data: [
              {
                id: "123121ee",
                name: "Klinik Demo Husada",
                email: "darren0208.dc@gmail.com",
                phone: "62812345678901",
                _count: {
                  Poli: 0,
                  users: 1,
                  Patient: 0,
                  Category: 0,
                  Pharmacy_Task: 0,
                },
                address: "Keputih Tegal Timur 3B. nomor 21",
              },
            ],
          },
        }),
        []
      );
    return s(y, {
      children: s(r, {
        filters: c ?? [],
        sorts: u ?? [],
        groups: m ?? [],
        pagination: l ?? {
          skip: 0,
          limit: 50,
          source: { key: "Limit", type: "header" },
        },
        queryBuilder: b,
        children: s(r.Grid, {
          id: "a4aae24f-7d59-4b51-972f-e1d1256eca46",
          columns: p,
          type: "static",
          attributes: { ...o.attributes, data: d ?? o.attributes.data },
        }),
      }),
    });
  };
export { h as TABLE_ID, R as Table };
