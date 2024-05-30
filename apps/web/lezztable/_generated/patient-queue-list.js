import * as a from "react";
import { Table as i } from "@lezztable-demo/react";
import { Fragment as T, jsx as r } from "react/jsx-runtime";
var h = "ac754dcd-d2cc-4a4f-bad0-caab42797115",
  E = ({
    filters: c,
    sorts: u,
    groups: l,
    pagination: m,
    columns: o,
    headers: n,
    queryBuilder: b,
    onClick: k,
    data: d,
    onAction: y,
  }) => {
    let p = a.useMemo(
        () =>
          [
            {
              key: "patient",
              name: "Patient Object",
              type: "LongText",
              attributes: { isVisible: !0 },
            },
          ].map((e) => {
            let t = o?.find((f) => f?.key === e.key);
            return t ? { ...e, ...t } : e;
          }),
        [o]
      ),
      g = a.useMemo(() => {
        if (n) return Object.entries(n).map(([e, t]) => ({ key: e, value: t }));
      }, [n]),
      s = a.useMemo(
        () => ({
          type: "static",
          columns: [
            {
              key: "patient",
              name: "Patient Object",
              type: "LongText",
              attributes: { isVisible: !0 },
            },
          ],
          attributes: {
            data: [
              {
                patient: {
                  address: "Keputih Tegal Timur",
                  fullName: "Darren Christian",
                  medicalNumber: "2024.04.00012",
                },
              },
            ],
          },
        }),
        []
      );
    return r(T, {
      children: r(i, {
        filters: c ?? [],
        sorts: u ?? [],
        groups: l ?? [],
        pagination: m ?? {
          skip: 0,
          limit: 50,
          source: { key: "Limit", type: "header" },
        },
        queryBuilder: b,
        children: r(i.Grid, {
          id: "3421a2ed-7354-4267-a53f-f688fe2aa2d5",
          columns: p,
          type: "static",
          attributes: { ...s.attributes, data: d ?? s.attributes.data },
        }),
      }),
    });
  };
export { h as TABLE_ID, E as Table };
