"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFindIcd9CM } from "@/services/icd/hooks/use-find-icd-9cm";
import { useFindIcd10 } from "@/services/icd/hooks/use-find-icd-10";
import { useCreatePatientAssessment } from "@/services/patient-assessment/hooks/use-create-patient-assessment";
import type {
  CreatePatientAssessmentDto,
  CreatePatientAssessmentSchema,
} from "@/services/patient-assessment/types/dto";
import { createPatientAssessmentSchema } from "@/services/patient-assessment/types/dto";

export function ClinicDiagnosePatientForm(): JSX.Element {
  const form = useForm<CreatePatientAssessmentSchema>({
    resolver: zodResolver(createPatientAssessmentSchema),
  });

  const { mutateAsync } = useCreatePatientAssessment();
  const [isIcd10Open, setIsIcd10Open] = useState(false);
  const [icd10Search, setIcd10Search] = useState("");
  const { data: icd10Data } = useFindIcd10({ search: icd10Search, limit: 20 });

  const [isIcd9CMOpen, setIsIcd9CMOpen] = useState(false);
  const [icd9CMSearch, setIcd9CMSearch] = useState("");
  const { data: icd9CMData } = useFindIcd9CM({
    search: icd9CMSearch,
    limit: 20,
  });

  const onSubmit = useCallback(
    async (data: CreatePatientAssessmentDto) => {
      await mutateAsync(data);
    },
    [mutateAsync],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="subjective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjektif</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Patient's story of complain, pain, feel etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objektif</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observation, physical exam and laboratory information summary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assessment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penilaian</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Assessment, a summary of your diagnosis of the patient's existing condition"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icd10Code"
          render={({ field: { value, onChange } }) => {
            const options = icd10Data?.data ?? [];

            const label = icd10Data?.data.find(
              (disease) => disease.code === value,
            )?.strt;

            return (
              <FormItem>
                <FormLabel>ICD10</FormLabel>
                <FormControl>
                  <Popover onOpenChange={setIsIcd10Open} open={isIcd10Open}>
                    <PopoverTrigger asChild>
                      <Button
                        aria-expanded={isIcd10Open}
                        className="w-full justify-between"
                        role="combobox"
                        variant="outline"
                      >
                        {value ? label : "Select disease..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] max-h-[300px] overflow-y-auto p-0">
                      <Command>
                        <CommandInput
                          onValueChange={(commandValue) => {
                            setIcd10Search(commandValue);
                          }}
                          placeholder="Search diseases..."
                          value={icd10Search}
                        />
                        <CommandEmpty>No diseases found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((item) => (
                            <CommandItem
                              key={item.code}
                              onSelect={(currentValue) => {
                                onChange(currentValue);
                                setIsIcd10Open(false);
                              }}
                              value={item.code}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === item.code
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {item.strt}
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
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rencana</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The treatment plan (e.g., medication, therapies, surgeries)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icd9CMCode"
          render={({ field: { value, onChange } }) => {
            const label = icd9CMData?.data.find(
              (action) => action.code === value,
            )?.str;

            return (
              <FormItem>
                <FormLabel>ICD9CM / Tindakan</FormLabel>
                <FormControl>
                  <Popover onOpenChange={setIsIcd9CMOpen} open={isIcd9CMOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        aria-expanded={isIcd9CMOpen}
                        className="w-full justify-between"
                        role="combobox"
                        variant="outline"
                      >
                        {value ? label : "Select action..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] max-h-[300px] overflow-y-auto p-0">
                      <Command>
                        <CommandInput
                          onValueChange={(commandValue) => {
                            setIcd9CMSearch(commandValue);
                          }}
                          placeholder="Search actions..."
                          value={icd9CMSearch}
                        />
                        <CommandEmpty>No actions found.</CommandEmpty>
                        <CommandGroup>
                          {icd9CMData?.data.map((item) => (
                            <CommandItem
                              key={item.code}
                              onSelect={(currentValue) => {
                                onChange(currentValue);
                                setIsIcd9CMOpen(false);
                              }}
                              value={item.code}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === item.code
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {item.str}
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

        <div className="flex flex-row justify-end">
          <Button className="mt-4">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
