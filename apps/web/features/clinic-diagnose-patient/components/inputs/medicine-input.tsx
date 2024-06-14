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
import { useFindMedicine } from "@/services/medicine/hooks/use-find-medicine";

interface MedicineInput {
  value?: number | string;
  onChange: (value: MedicineInput["value"]) => unknown;
  readOnly?: boolean;
}

export function MedicineInput({
  onChange,
  readOnly,
  value,
}: MedicineInput): React.JSX.Element {
  const { isOpen, setIsOpen } = useDisclose();

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  const { data } = useFindMedicine({
    search: debouncedSearch,
    limit: 50,
  });

  const label = useMemo(() => {
    if (!value) return;

    const findData = data?.data.find((action) => action.id === value);
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
          {label?.title ?? "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96 max-h-[300px] overflow-y-auto p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={(commandValue) => {
              setSearch(commandValue);
            }}
            placeholder="Search medicines..."
            value={search}
          />
          <CommandEmpty>No medicines found.</CommandEmpty>
          <CommandGroup>
            {data?.data.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={(currentValue) => {
                  const selectedValue = data.data.find(
                    (option) => String(option.id) === currentValue,
                  );

                  onChange(selectedValue?.id);
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
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
