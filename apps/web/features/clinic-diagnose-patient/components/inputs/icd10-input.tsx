"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  const { data } = useFindIcd10({
    search: debouncedSearch,
    limit: 20,
  });

  const label = useMemo(() => {
    const findData = data?.data.find((action) => action.code === value);
    return findData;
  }, [data?.data, value]);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={isOpen}
          className={cn(
            "w-full justify-between",
            readOnly && "pointer-events-none",
          )}
          role="combobox"
          variant="outline"
        >
          {value ? (
            <span className="font-normal">
              <span className="font-semibold">{label?.code}</span> -{" "}
              {label?.strt}
            </span>
          ) : (
            "Select action..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={(commandValue) => {
              setSearch(commandValue);
            }}
            placeholder="Search actions..."
            value={search}
          />
          <CommandEmpty>No actions found.</CommandEmpty>
          <CommandGroup>
            {data?.data.map((item) => (
              <CommandItem
                key={item.code}
                onSelect={(currentValue) => {
                  onChange(
                    currentValue.slice(0, 1).toUpperCase() +
                      currentValue.slice(1, currentValue.length),
                  );
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
                <span className="font-semibold mr-1">{item.code}</span>-{" "}
                {item.strt}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
