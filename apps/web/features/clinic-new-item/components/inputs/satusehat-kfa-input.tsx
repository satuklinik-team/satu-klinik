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
import { useFindSatuSehatKfa } from "@/services/satusehat-kfa/hooks/use-find-satusehat-kfa";
import type { SatuSehatKfaEntity } from "@/services/satusehat-kfa/types/entity";

interface Properties {
  value?: string;
  onChange: (value: string, kfa: SatuSehatKfaEntity | null) => unknown;
  readOnly?: boolean;
}

export function SatuSehatKfaInput({
  onChange,
  value,
  readOnly,
}: Properties): React.JSX.Element {
  const { isOpen, setIsOpen, onClose } = useDisclose();

  const [search, setSearch] = useState<string>(value ?? "");
  const debouncedSearch = useDebounce(search, 300);

  const isSearchEnabled = debouncedSearch.length >= 3;

  const { data } = useFindSatuSehatKfa(
    {
      search: debouncedSearch,
      limit: 20,
    },
    { enabled: isSearchEnabled },
  );

  const label = useMemo(() => {
    const findData = data?.data.find((action) => action.kfaCode === value);
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
                <span className="font-semibold">{label?.kfaCode}</span> -{" "}
                {label?.name}
              </span>
            )
          }
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onClick={(e) => {
            if (isOpen) {
              e.preventDefault();
            }
          }}
          onReset={() => {
            setSearch("");
            onChange("", null);
            setTimeout(() => {
              setIsOpen(true);
            }, 500);
          }}
          placeholder="Cari data obat..."
          readOnly={readOnly}
          value={search}
        />
      </AutocompleteTrigger>
      <AutocompleteContent>
        <AutocompleteEmpty>No data found...</AutocompleteEmpty>
        <AutocompleteGroup>
          {data?.data.map((item) => (
            <AutocompleteItem
              key={item.kfaCode}
              onSelect={() => {
                onChange(item.kfaCode, item);
                onClose();
              }}
              value={item.kfaCode}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === item.kfaCode ? "opacity-100" : "opacity-0",
                )}
              />
              <span className="text-sm mr-1">{item.kfaCode}</span>- {item.name}
            </AutocompleteItem>
          ))}
        </AutocompleteGroup>
      </AutocompleteContent>
    </Autocomplete>
  );
}
