"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, ImagePlusIcon } from "lucide-react";
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
import { useUpdateMedicine } from "@/services/medicine/hooks/use-update-medicine";
import type {
  UpdateMedicineDto,
  UpdateMedicineSchema,
} from "@/services/medicine/types/dto";
import { updateMedicineSchema } from "@/services/medicine/types/dto";
import type { MedicineEntity } from "@/services/medicine/types/entity";
import { MedicineQueryKeyFactory } from "@/services/medicine/utils/query-key.factory";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine";

interface ClinicEditItemFormProps {
  defaultValues: MedicineEntity;
}

export function ClinicEditItemForm({
  defaultValues,
}: ClinicEditItemFormProps): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const { data: medicineCategoryData } = useFindMedicineCategory({
    skip: 0,
    limit: 50,
    search,
  });

  const form = useForm<UpdateMedicineSchema>({
    resolver: zodResolver(updateMedicineSchema),
    defaultValues,
  });

  const imageRef = form.register("image");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync } = useUpdateMedicine(String(defaultValues.id));

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onSubmit = useCallback(
    async (dto: UpdateMedicineDto) => {
      const formData = new FormData();

      if (dto.image?.item(0)) {
        formData.append("image", dto.image.item(0) as unknown as Blob);
      }

      formData.append("title", String(dto.title));
      formData.append("price", String(dto.price));
      formData.append("stock", String(dto.stock));
      formData.append("discount", String(dto.discount));
      formData.append("categoryId", String(dto.categoryId));

      await mutateAsync(formData as unknown as UpdateMedicineDto);
      await queryClient.invalidateQueries({
        queryKey: new MedicineQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Memperbarui Obat Baru!", variant: "success" });
    },
    [mutateAsync, queryClient, toast],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            const value = field.value;
            const imageObject = value?.item(0);

            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormLabel className="block" htmlFor="image">
                  <div className="flex flex-col gap-3 items-center border border-dashed py-8 rounded-lg cursor-pointer">
                    <ImagePlusIcon
                      className="text-muted-foreground"
                      size={32}
                    />
                    {imageObject?.name || defaultValues.imageUrl ? (
                      <p className="text-muted-foreground text-xs font-bold">
                        {imageObject?.name ?? defaultValues.imageUrl}
                      </p>
                    ) : null}
                    <p className="text-muted-foreground font-bold">
                      Edit image
                    </p>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    id="image"
                    type="file"
                    {...imageRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

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
                      <Command shouldFilter={false}>
                        <CommandInput
                          onValueChange={(inputValue) => {
                            setSearch(inputValue);
                          }}
                          placeholder="Search categories..."
                          value={search}
                        />
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((item) => (
                            <CommandItem
                              key={item.id}
                              onSelect={(currentValue) => {
                                onChange(Number(currentValue));
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
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
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
                <Input
                  placeholder="Discount %"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
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
                <Input
                  placeholder="Quantity"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-4">Simpan</Button>
      </form>
    </Form>
  );
}