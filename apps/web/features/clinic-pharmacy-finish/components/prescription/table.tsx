"use client";

import type { ComponentProps } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { BaseTable } from "@/components/shared/table/base-table";
import { Cell } from "@/components/shared/table/cell";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

type BaseTableProps = ComponentProps<
  typeof BaseTable<Required<PrescriptionEntity>>
>;

interface PharmacyPrescriptionTable extends Omit<BaseTableProps, "columns"> {
  isLoading?: boolean;
  columns?:
    | BaseTableProps["columns"]
    | ((columns: BaseTableProps["columns"]) => BaseTableProps["columns"]);
  readOnly?: boolean;
  onSelectChange?: (ids: Required<PrescriptionEntity>["id"][]) => unknown;
  selectedIds?: Required<PrescriptionEntity>["id"][];
}

export function PharmacyPrescriptionTable({
  columns: propsColumns,
  onSelectChange,
  readOnly,
  selectedIds,
  ...props
}: PharmacyPrescriptionTable): React.JSX.Element {
  const onSelectChangeRef =
    useRef<PharmacyPrescriptionTable["onSelectChange"]>(onSelectChange);

  useEffect(() => {
    if (!onSelectChange) return;
    onSelectChangeRef.current = onSelectChange;
  }, [onSelectChange]);

  const ids = useMemo(() => selectedIds ?? [], [selectedIds]);

  const onSelect = useCallback(
    (id: Required<PrescriptionEntity>["id"]) => {
      if (!onSelectChangeRef.current) return;

      const rowIds = ids;

      if (rowIds.includes(id)) {
        onSelectChangeRef.current(rowIds.filter((item) => item !== id));
        return;
      }

      onSelectChangeRef.current([...rowIds, id]);
    },
    [ids]
  );

  const onSelectAll = useCallback(
    (checked: boolean) => {
      if (!onSelectChangeRef.current) return;

      if (checked) {
        onSelectChangeRef.current(props.rows.map((item) => item.id));

        return;
      }

      onSelectChangeRef.current([]);
    },
    [props.rows]
  );

  const rawColumns = useMemo(() => {
    const cols: PharmacyPrescriptionTable["columns"] = [
      {
        key: "name",
        name: "Nama",
        renderCell: (row: Required<PrescriptionEntity>) => {
          return (
            <Cell className="flex flex-col items-start gap-0">
              <p className="text-base font-semibold">{row.Medicine.title}</p>
              <p>Total: {row.totalQuantity} pcs</p>
            </Cell>
          );
        },
      },
      {
        key: "dosis",
        name: "Dosis",
        renderCell: (row: Required<PrescriptionEntity>) => {
          return (
            <Cell className="gap-3">
              <Badge className="text-xs">
                {row.frequency} x {row.doseQuantity}
              </Badge>
            </Cell>
          );
        },
      },
      {
        key: "notes",
        name: "Notes",
        renderCell: (row: Required<PrescriptionEntity>) => {
          return <Cell className="gap-3">{row.notes ? row.notes : "-"}</Cell>;
        },
      },
    ];

    if (!readOnly) {
      cols.unshift({
        key: "checkbox-select",
        name: "checkbox",
        renderCell: (row: Required<PrescriptionEntity>) => {
          return (
            <Cell className="flex flex-col items-start gap-0">
              <Checkbox
                checked={ids.includes(row.id)}
                onCheckedChange={() => {
                  onSelect(row.id);
                }}
              />
            </Cell>
          );
        },
        renderHeader: () => {
          return (
            <Cell className="flex flex-col items-start gap-0">
              <Checkbox
                checked={Boolean(ids.length)}
                onCheckedChange={onSelectAll}
              />
            </Cell>
          );
        },
      });
    }

    return cols;
  }, [ids, onSelect, onSelectAll, readOnly]);

  const columns = useMemo(() => {
    if (Array.isArray(propsColumns)) {
      return propsColumns;
    }

    if (typeof propsColumns === "function") {
      return propsColumns(rawColumns);
    }

    return rawColumns;
  }, [propsColumns, rawColumns]);

  return (
    <BaseTable<Required<PrescriptionEntity>> {...props} columns={columns} />
  );
}
