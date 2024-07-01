"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { Check } from "lucide-react";
import { useMemo, useRef, useState } from "react";

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
import { useFindIcd9CM } from "@/services/icd/hooks/use-find-icd-9cm";

interface Properties {
  value?: string;
  onChange: (value: string) => unknown;
  readOnly?: boolean;
}

export function ICD9CMInput({
  onChange,
  value,
  readOnly,
}: Properties): React.JSX.Element {
  const { isOpen, setIsOpen, onClose } = useDisclose();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [search, setSearch] = useState<string>(value ?? "");
  const debouncedSearch = useDebounce(search, 300);

  const isSearchEnabled = debouncedSearch.length >= 3;

  const { data } = useFindIcd9CM(
    {
      search: debouncedSearch,
      limit: 20,
    },
    { enabled: isSearchEnabled }
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
      <AutocompleteTrigger
        onFocus={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <AutocompleteInput
          display={
            Boolean(value) && (
              <span className="text-sm">
                <span className="font-semibold">{label?.code}</span> -{" "}
                {label?.str}
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
            onChange("");
            setTimeout(() => {
              setIsOpen(true);
            }, 500);
          }}
          placeholder="Cari ICD9CM/Tindakan"
          readOnly={readOnly}
          ref={inputRef}
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
                  value === item.code ? "opacity-100" : "opacity-0"
                )}
              />
              <span className="text-sm mr-1">{item.code}</span>- {item.str}
            </AutocompleteItem>
          ))}
        </AutocompleteGroup>
      </AutocompleteContent>
    </Autocomplete>
  );

  // return (
  //   <Popover onOpenChange={setIsOpen} open={isOpen}>
  //     <PopoverTrigger asChild>
  //       <Button
  //         aria-expanded={isOpen}
  //         className={cn(
  //           "w-full justify-between",
  //           readOnly && "pointer-events-none"
  //         )}
  //         role="combobox"
  //         variant="outline"
  //       >
  //         {value ? (
  //           <span className="font-normal">
  //             <span className="font-semibold">{label?.code}</span> -{" "}
  //             {label?.str}
  //           </span>
  //         ) : (
  //           "Select action..."
  //         )}
  //         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //       </Button>
  //     </PopoverTrigger>
  //     <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
  //       <Command shouldFilter={false}>
  //         <CommandInput
  //           onValueChange={(commandValue) => {
  //             setSearch(commandValue);
  //           }}
  //           placeholder="Search actions..."
  //           value={search}
  //         />
  //         <CommandEmpty>No actions found.</CommandEmpty>
  //         <CommandGroup>
  //           {data?.data.map((item) => (
  //             <CommandItem
  //               key={item.code}
  //               onSelect={(currentValue) => {
  //                 onChange(currentValue);
  //                 onClose();
  //               }}
  //               value={item.code}
  //             >
  //               <Check
  //                 className={cn(
  //                   "mr-2 h-4 w-4",
  //                   value === item.code ? "opacity-100" : "opacity-0"
  //                 )}
  //               />
  //               <span className="font-semibold mr-1">{item.code}</span>-{" "}
  //               {item.str}
  //             </CommandItem>
  //           ))}
  //         </CommandGroup>
  //       </Command>
  //     </PopoverContent>
  //   </Popover>
  // );
}
