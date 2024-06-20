"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteTrigger,
} from "@/components/ui/autocomplete";
import { useDisclose } from "@/hooks/use-disclose";
import { cn } from "@/lib/utils";
import { useFindMedicine } from "@/services/medicine/hooks/use-find-medicine";
import type { MedicineEntity } from "@/services/medicine/types/entity";

interface MedicineInput {
  value?: number | string | MedicineEntity;
  onChange: (value?: MedicineInput["value"]) => unknown;
  readOnly?: boolean;
}

export function MedicineInput({
  onChange,
  readOnly,
  value,
}: MedicineInput): React.JSX.Element {
  const { isOpen, setIsOpen } = useDisclose();

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useFindMedicine({
    search: debouncedSearch,
    limit: 50,
  });

  const label = useMemo(() => {
    if (!value) return;

    if (typeof value === "object") return value;

    const findData = data?.data.find((action) => action.id === value);
    return findData;
  }, [data?.data, value]);

  return (
    <Autocomplete onOpenChange={setIsOpen} open={isOpen}>
      <AutocompleteTrigger>
        <AutocompleteInput
          display={label?.title}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onReset={() => {
            setSearch("");
            onChange("");
            setTimeout(() => {
              setIsOpen(true);
            }, 500);
          }}
          placeholder="Cari obat..."
          readOnly={readOnly}
          value={search}
        />
      </AutocompleteTrigger>
      <AutocompleteContent>
        <AutocompleteEmpty>No medicines found.</AutocompleteEmpty>
        <AutocompleteGroup>
          {data?.data.map((item) => (
            <AutocompleteItem
              key={item.id}
              onSelect={(currentValue) => {
                const selectedValue = data.data.find(
                  (option) => String(option.id) === currentValue,
                );

                setSearch(selectedValue?.title ?? "");
                onChange(selectedValue);
                setIsOpen(false);
              }}
              value={String(item.id)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  String(value) === String(item.id)
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {item.title}
            </AutocompleteItem>
          ))}
        </AutocompleteGroup>
      </AutocompleteContent>
    </Autocomplete>
  );
}
