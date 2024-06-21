"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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
import { UploadInput } from "@/components/ui/upload-input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useCreateMedicine } from "@/services/medicine/hooks/use-create-medicine";
import type {
  CreateMedicineDto,
  CreateMedicineSchema,
} from "@/services/medicine/types/dto";
import { createMedicineSchema } from "@/services/medicine/types/dto";
import { MedicineQueryKeyFactory } from "@/services/medicine/utils/query-key.factory";
import { useFindMedicineCategory } from "@/services/medicine-category/hooks/use-find-medicine-category";

export function ClinicNewItemForm(): JSX.Element {
  const router = useRouter();
  const { clinicId } = useParams();
  const [search, setSearch] = useState<string>("");

  const { data: medicineCategoryData } = useFindMedicineCategory({
    skip: 0,
    limit: 50,
    search,
  });

  const form = useForm<CreateMedicineSchema>({
    resolver: zodResolver(createMedicineSchema),
    mode: "onTouched",
  });

  const { setValue, setError } = form;

  // const imageRef = form.register("image");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateMedicine();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onSubmit = useCallback(
    async (dto: CreateMedicineDto) => {
      const formData = new FormData();

      formData.append("image", dto.image as unknown as Blob);
      formData.append("title", String(dto.title));
      formData.append("price", String(dto.price));
      formData.append("stock", String(dto.stock));
      formData.append("discount", String(dto.discount));
      formData.append("categoryId", String(dto.categoryId));

      await mutateAsync(formData as unknown as CreateMedicineDto);
      await queryClient.invalidateQueries({
        queryKey: new MedicineQueryKeyFactory().lists(),
      });
      toast({ title: "Berhasil Membuat Obat Baru!", variant: "success" });
      router.push(`/clinic/${clinicId as string}/items`);
    },
    [clinicId, mutateAsync, queryClient, router, toast]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            const imageObject = field.value as unknown as File | undefined;

            return (
              <FormItem>
                <FormLabel>Image</FormLabel>

                <FormControl>
                  <UploadInput
                    accept="image/*"
                    isCompressed
                    maxSizeKB={4096}
                    onChange={(file) => {
                      setValue("image", file);
                    }}
                    onError={(e) => {
                      setError("image", { message: String(e) });
                    }}
                  >
                    <div className="flex flex-col gap-3 items-center border border-dashed py-8 rounded-lg cursor-pointer">
                      {imageObject ? (
                        <Image
                          alt={imageObject.name}
                          className="object-scale-down"
                          height={256}
                          src={URL.createObjectURL(imageObject)}
                          width={256}
                        />
                      ) : (
                        <ImagePlusIcon
                          className="text-muted-foreground"
                          size={32}
                        />
                      )}
                      <p className="text-muted-foreground font-bold text-sm">
                        {imageObject?.name ? "Change file" : "Upload a file"}
                      </p>
                    </div>
                  </UploadInput>
                  {/* <Input
                    accept="image/*"
                    className="hidden"
                    id="image"
                    type="file"
                    {...imageRef}
                  /> */}
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
            const options = medicineCategoryData.data;

            const label = medicineCategoryData.data.find(
              (category) => category.id === value
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
                    <PopoverContent className="max-h-[300px] overflow-y-auto p-0">
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
                                    : "opacity-0"
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
