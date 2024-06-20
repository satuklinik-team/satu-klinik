import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type DefaultValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MedicineInput } from "@/features/clinic-diagnose-patient/components/inputs/medicine-input";
import {
  type PrescriptionEntity,
  prescriptionSchema,
} from "@/services/prescription/types/entity";

interface PrescriptionForm {
  title: string;
  defaultValues?: DefaultValues<PrescriptionEntity> | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prescription: PrescriptionEntity) => void;
}

const resetValue: DefaultValues<PrescriptionEntity> = {
  doseQuantity: 0,
  frequency: 0,
  period: 1,
  totalQuantity: 0,
  supplyDuration: 0,
  notes: "",
  medicineId: undefined,
};

export function PrescriptionForm({
  title,
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: PrescriptionForm): JSX.Element {
  const form = useForm<PrescriptionEntity>({
    resolver: zodResolver(prescriptionSchema),
  });

  useEffect(() => {
    if (!defaultValues) {
      form.reset(resetValue);
      return;
    }

    form.reset(defaultValues);
  }, [defaultValues, form, open]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Form {...form}>
          <form id="prescription-form" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mb-6">
              <FormField
                control={form.control}
                name="Medicine"
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormItem>
                      <FormLabel>Obat</FormLabel>
                      <FormControl>
                        <MedicineInput
                          onChange={(newValue) => {
                            onChange(newValue);
                          }}
                          value={value}
                        />
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
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            min={0}
                            placeholder="Frequency"
                            type="number"
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
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            min={0}
                            placeholder="Dose"
                            type="number"
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
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          min={0}
                          placeholder="Supply Duration"
                          type="number"
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
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} type="button">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
