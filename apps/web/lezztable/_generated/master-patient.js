import * as a from "react";
import { Table as i } from "@lezztable-demo/react";
import { Fragment as y, jsx as n } from "react/jsx-runtime";
var C = "e651a0fb-992b-470b-ba8b-7cbb1b75a918",
  E = ({
    filters: u,
    sorts: c,
    groups: m,
    pagination: l,
    columns: r,
    headers: o,
    queryBuilder: b,
    onClick: T,
    data: p,
    onAction: f,
  }) => {
    let d = a.useMemo(
        () =>
          [
            {
              key: "name",
              name: "Nama",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
              key: "action",
              name: "Action",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
          ].map((e) => {
            let t = r?.find((k) => k?.key === e.key);
            return t ? { ...e, ...t } : e;
          }),
        [r]
      ),
      g = a.useMemo(() => {
        if (o) return Object.entries(o).map(([e, t]) => ({ key: e, value: t }));
      }, [o]),
      s = a.useMemo(
        () => ({
          type: "static",
          columns: [
            {
              key: "name",
              name: "Nama",
              type: "Custom",
              attributes: { isVisible: !0 },
            },
            {
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
                nik: "2024.04.00006",
                sex: "Male",
                name: "Pasien 1",
                vitals: {
                  pulse: 90,
                  height: 182,
                  weight: 64,
                  allergy: "Gak Ada",
                  sistole: 122,
                  diastole: 132,
                  respiration: 128,
                  temperature: 37,
                },
                address: "Keputih Tegal Timur",
                bloodType: "O",
                phoneNumber: "082228883006",
                medicalRecordNumber: "2024.04.00006",
              },
            ],
          },
        }),
        []
      );
    return n(y, {
      children: n(i, {
        filters: u ?? [],
        sorts: c ?? [],
        groups: m ?? [],
        pagination: l ?? {
          skip: 0,
          limit: 50,
          source: { key: "Limit", type: "header" },
        },
        queryBuilder: b,
        children: n(i.Grid, {
          id: "31567785-85cb-4790-b889-1a35cca9a9fb",
          columns: d,
          type: "static",
          attributes: { ...s.attributes, data: p ?? s.attributes.data },
        }),
      }),
    });
  };
export { C as TABLE_ID, E as Table };
