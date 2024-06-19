import { Input } from "@lezzform/react";
import { useDebounce } from "@uidotdev/usehooks";
import { Check, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFindPatient } from "@/services/patient/hooks/use-find-patient";
import type { PatientEntity } from "@/services/patient/types/entity";

interface PatientSearchProps {
  onChange?: (patient: PatientEntity) => unknown;
  value?: PatientEntity;
}

export function PatientSearch({
  onChange,
  value,
}: PatientSearchProps): React.JSX.Element {
  const [isPatientSearchOpen, setIsPatientSearchOpen] =
    useState<boolean>(false);
  const [patientSearch, setPatientSearch] = useState<string>("");
  const debouncedPatientSearch = useDebounce(patientSearch, 300);

  const isSearchEnabled = debouncedPatientSearch.length >= 3;

  const { data: searchPatientData } = useFindPatient(
    {
      search: debouncedPatientSearch,
      limit: 20,
    },
    { enabled: isSearchEnabled },
  );

  useEffect(() => {
    if (!isSearchEnabled) return;

    setIsPatientSearchOpen(true);
  }, [isSearchEnabled, debouncedPatientSearch]);

  return (
    <Popover
      onOpenChange={setIsPatientSearchOpen}
      open={Boolean(isPatientSearchOpen && isSearchEnabled)}
    >
      <Command className="h-fit" shouldFilter={false}>
        <PopoverTrigger className="mb-2">
          <Input
            onChange={(e) => {
              setPatientSearch(e.target.value);
            }}
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
            prefixAdornment={{ icon: <Search size={18} /> }}
            value={patientSearch}
          />
        </PopoverTrigger>
        <PopoverContent
          className="max-h-[300px] overflow-y-auto p-0 DropdownPopoverContent"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <CommandEmpty>No patients found.</CommandEmpty>
          <CommandGroup>
            {searchPatientData?.data.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  onChange?.(item);

                  setIsPatientSearchOpen(false);
                  setPatientSearch("");
                }}
                value={item.id}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.id === item.id ? "opacity-100" : "opacity-0",
                  )}
                />
                <div className="text-xs">
                  <p className="text-sm font-semibold">{item.fullname}</p>
                  <p>{item.norm}</p>
                  <p>{item.nik}</p>
                  <p>{item.birthAt}</p>
                  <p>{item.phone}</p>
                  <p>{item.address}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
