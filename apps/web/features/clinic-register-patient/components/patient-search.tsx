import { useDebounce } from "@uidotdev/usehooks";
import { Check } from "lucide-react";
import { useState } from "react";

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

  const { data: searchPatientData } = useFindPatient({
    search: debouncedPatientSearch,
    limit: 20,
  });

  return (
    <Popover onOpenChange={setIsPatientSearchOpen} open={isPatientSearchOpen}>
      <PopoverTrigger asChild className="mb-5">
        <Button
          aria-expanded={isPatientSearchOpen}
          className="w-full justify-between text-muted-foreground hover:text-muted-foreground"
          role="combobox"
          variant="outline"
        >
          Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={(commandValue) => {
              setPatientSearch(commandValue);
            }}
            placeholder="Cari berdasarkan nama, nomor rekam medis, atau tempat tinggal"
            value={patientSearch}
          />
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}
