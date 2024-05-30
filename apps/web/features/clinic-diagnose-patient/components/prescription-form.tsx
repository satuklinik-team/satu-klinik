import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFindMedicine } from "@/services/medicine/hooks/use-find-medicine";
import {
  type PrescriptionEntity,
  prescriptionSchema,
} from "@/services/prescription/types/entity";

interface ClinicDiagnosePatientPrescriptionForm {
  title: string;
  defaultValues?: PrescriptionEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prescription: PrescriptionEntity) => void;
}

export function ClinicDiagnosePatientPrescriptionForm({
  title,
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: ClinicDiagnosePatientPrescriptionForm): JSX.Element {
  const form = useForm<PrescriptionEntity>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: { period: 1, ...defaultValues },
  });

  const [search, setSearch] = useState<string>(
    defaultValues?.medicine?.title ?? "",
  );

  const [isMedicineOpen, setIsMedicineOpen] = useState<boolean>(false);

  const { data: medicineData } = useFindMedicine({
    search,
    limit: 50,
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mb-6">
              <FormField
                control={form.control}
                name="medicine"
                render={({ field: { value, onChange } }) => {
                  const options = medicineData?.data;

                  return (
                    <FormItem>
                      <FormLabel>Obat</FormLabel>
                      <FormControl>
                        <Popover
                          onOpenChange={setIsMedicineOpen}
                          open={isMedicineOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              aria-expanded={isMedicineOpen}
                              className="w-full justify-between"
                              role="combobox"
                              variant="outline"
                            >
                              {value?.title ?? "Select medicine..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] max-h-[300px] overflow-y-auto p-0">
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
                                {options?.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    onSelect={(currentValue) => {
                                      const selectedValue = options.find(
                                        (option) =>
                                          String(option.id) === currentValue,
                                      );

                                      onChange({
                                        id: String(selectedValue?.id),
                                        title: selectedValue?.title,
                                      });
                                      setIsMedicineOpen(false);
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div>
                <p className="text-sm font-medium mb-2">Dosis (Signa)</p>
                <div className="flex flex-row items-center gap-3">
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            min={0}
                            onChange={(e) => {
                              onChange(Number(e.target.value));
                            }}
                            placeholder="Frequency"
                            type="number"
                            value={value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p>x</p>

                  <FormField
                    control={form.control}
                    name="doseQuantity"
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            min={0}
                            onChange={(e) => {
                              onChange(Number(e.target.value));
                            }}
                            placeholder="Dose"
                            type="number"
                            value={value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Select defaultValue="caplet">
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Satuan pemakaian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caplet">Kaplet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="supplyDuration"
                  render={({ field: { value, onChange } }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          min={0}
                          onChange={(e) => {
                            onChange(Number(e.target.value));
                          }}
                          placeholder="Supply Duration"
                          type="number"
                          value={value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Select defaultValue="daily">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Petunjuk Pemakaian</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan petunjuk pemakaian"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
