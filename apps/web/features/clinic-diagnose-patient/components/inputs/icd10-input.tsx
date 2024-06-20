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
import { useFindIcd10 } from "@/services/icd/hooks/use-find-icd-10";

interface Properties {
  value?: string;
  onChange: (value: string) => unknown;
  readOnly?: boolean;
}

export function ICD10nput({
  onChange,
  value,
  readOnly,
}: Properties): React.JSX.Element {
  const { isOpen, setIsOpen, onClose } = useDisclose();

  const [search, setSearch] = useState<string>(value ?? "");
  const debouncedSearch = useDebounce(search, 300);

  const isSearchEnabled = debouncedSearch.length >= 3;

  const { data } = useFindIcd10(
    {
      search: debouncedSearch,
      limit: 20,
    },
    { enabled: isSearchEnabled },
  );

  const label = useMemo(() => {
    const findData = data?.data.find((action) => action.code === value);
    return findData;
  }, [data?.data, value]);

  return (
    <Autocomplete
      onOpenChange={setIsOpen}
      open={Boolean(isOpen && isSearchEnabled)}
    >
      <AutocompleteTrigger>
        <AutocompleteInput
          display={
            Boolean(value) && (
              <span className="text-sm">
                <span className="font-semibold">{label?.code}</span> -{" "}
                {label?.strt}
              </span>
            )
          }
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={(e) => {
            e.preventDefault();
          }}
          onReset={() => {
            setSearch("");
            onChange("");
            setTimeout(() => {
              setIsOpen(true);
            }, 500);
          }}
          placeholder="Cari ICD10"
          readOnly={readOnly}
          value={search}
        />
      </AutocompleteTrigger>
      <AutocompleteContent>
        <AutocompleteEmpty>No data found...</AutocompleteEmpty>
        <AutocompleteGroup>
          {data?.data.map((item) => (
            <AutocompleteItem
              key={item.code}
              onSelect={() => {
                onChange(item.code);
                onClose();
              }}
              value={item.code}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === item.code ? "opacity-100" : "opacity-0",
                )}
              />
              <span className="text-sm mr-1">{item.code}</span>- {item.strt}
            </AutocompleteItem>
          ))}
        </AutocompleteGroup>
      </AutocompleteContent>
    </Autocomplete>
  );
}
