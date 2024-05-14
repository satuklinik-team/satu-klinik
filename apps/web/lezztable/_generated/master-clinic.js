import * as s from "react";
import { Table as r } from "@lezztable-demo/react";
import { Fragment as y, jsx as a } from "react/jsx-runtime";
var g = "a7b9253f-504c-41a1-8920-a3551a0343fd",
  E = ({
    filters: c,
    sorts: u,
    groups: b,
    pagination: l,
    columns: n,
    headers: i,
    queryBuilder: d,
    onClick: f,
    data: T,
    onAction: h,
  }) => {
    let m = s.useMemo(
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
      p = s.useMemo(() => {
        if (i) return Object.entries(i).map(([e, t]) => ({ key: e, value: t }));
      }, [i]),
      o = s.useMemo(
        () => ({
          type: "api",
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
          attributes: { url: "localhost:5050/api", path: "data", headers: [] },
        }),
        []
      );
    return a(y, {
      children: a(r, {
        filters: c ?? [],
        sorts: u ?? [],
        groups: b ?? [],
        pagination: l ?? {
          skip: 0,
          limit: 10,
          source: { path: "count", type: "body" },
        },
        queryBuilder: d,
        children: a(r.Grid, {
          id: "a4aae24f-7d59-4b51-972f-e1d1256eca46",
          columns: m,
          type: "api",
          attributes: { ...o.attributes, headers: p ?? o.attributes.headers },
        }),
      }),
    });
  };
export { g as TABLE_ID, E as Table };
