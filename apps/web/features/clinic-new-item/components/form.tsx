"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useCreateMedicine } from "@/services/medicine/hooks/use-create-medicine";
import type {
  CreateMedicineDto,
  CreateMedicineSchema,
} from "@/services/medicine/types/dto";
import { createMedicineSchema } from "@/services/medicine/types/dto";
import { MedicineQueryKeyFactory } from "@/services/medicine/utils/query-key.factory";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine";

export function ClinicNewItemForm(): JSX.Element {
  const { data: medicineCategoryData } = useFindMedicineCategory();

  const form = useForm<CreateMedicineSchema>({
    resolver: zodResolver(createMedicineSchema),
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateMedicine();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onSubmit = useCallback(
    async (dto: CreateMedicineDto) => {
      await mutateAsync(dto);
      await queryClient.invalidateQueries({
        queryKey: new MedicineQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Membuat Obat Baru!", variant: "success" });
    },
    [mutateAsync, queryClient, toast],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field: { value, onChange } }) => {
            const options = medicineCategoryData?.data ?? [];

            const label = medicineCategoryData?.data.find(
              (category) => category.id === value,
            )?.name;

            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Popover
                    onOpenChange={setIsCategoryOpen}
                    open={isCategoryOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        aria-expanded={isCategoryOpen}
                        className="w-full justify-between"
                        role="combobox"
                        variant="outline"
                      >
                        {value ? label : "Select category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] max-h-[300px] overflow-y-auto p-0">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={(currentValue) => {
                                onChange(currentValue);
                                setIsCategoryOpen(false);
                              }}
                              value={String(item.id)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === item.id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {item.name}
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

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input placeholder="Discount %" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Quantity" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-end">
          <Button className="mt-4">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
