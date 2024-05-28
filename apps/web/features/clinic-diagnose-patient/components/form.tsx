"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useFindIcd9CM } from "@/services/icd/hooks/use-find-icd-9cm";
import { useFindIcd10 } from "@/services/icd/hooks/use-find-icd-10";
import { useCreatePatientAssessment } from "@/services/patient-assessment/hooks/use-create-patient-assessment";
import type {
  CreatePatientAssessmentDto,
  CreatePatientAssessmentSchema,
} from "@/services/patient-assessment/types/dto";
import { createPatientAssessmentSchema } from "@/services/patient-assessment/types/dto";
import { PharmacyTaskQueryKeyFactory } from "@/services/pharmacy-task/utils/query-key.factory";
import type { PrescriptionEntity } from "@/services/prescription/types/entity";

import { ClinicDiagnosePatientPrescriptionForm } from "./prescription-form";
import { ClinicDiagnosePatientPrescriptionTable } from "./prescription-table";

export function ClinicDiagnosePatientForm(): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mrId } = useParams();

  const form = useForm<CreatePatientAssessmentSchema>({
    resolver: zodResolver(createPatientAssessmentSchema),
    defaultValues: { mrid: mrId as string, prescriptions: [] },
  });

  const {
    fields: prescriptions,
    remove,
    insert,
  } = useFieldArray({
    control: form.control,
    name: "prescriptions",
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

  const [onAddPrescription, setOnAddPrescription] = useState<boolean>();

  const [onEditPrescription, setOnEditPrescription] =
    useState<PrescriptionEntity>();

  const onSubmit = useCallback(
    async (data: CreatePatientAssessmentDto) => {
      await mutateAsync({
        ...data,
        prescriptions: {
          ...(data.prescriptions?.map((item) => ({
            ...item,
            medicine: undefined,
          })) ?? []),
        },
      });
      toast({ title: "Berhasil Membuat Diagnosa!", variant: "success" });
      await queryClient.invalidateQueries({
        queryKey: new PharmacyTaskQueryKeyFactory().lists(),
      });
    },
    [mutateAsync, queryClient, toast],
  );

  return (
    <>
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

              const label = options.find(
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
                                  onChange(
                                    currentValue.slice(0, 1).toUpperCase() +
                                      currentValue.slice(
                                        1,
                                        currentValue.length,
                                      ),
                                  );
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

          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium">Prescriptions</p>
            <div className="flex flex-col gap-3">
              <ClinicDiagnosePatientPrescriptionTable
                onDelete={remove}
                onEdit={(currentPrescription) => {
                  setOnEditPrescription(currentPrescription);
                }}
                prescriptions={prescriptions}
              />
              <Button
                className="w-min"
                onClick={() => {
                  setOnAddPrescription(true);
                }}
                size="sm"
                type="button"
                variant="ghost"
              >
                + Add More
              </Button>
            </div>
          </div>

          <div className="flex flex-row justify-end">
            <Button className="mt-4">Simpan</Button>
          </div>
        </form>
      </Form>
      <ClinicDiagnosePatientPrescriptionForm
        defaultValues={onEditPrescription}
        onOpenChange={(open) => {
          if (!open) {
            setOnAddPrescription(undefined);
            setOnEditPrescription(undefined);
          }
        }}
        onSubmit={(prescription) => {
          insert(prescriptions.length, {
            ...prescription,
            medicineId: prescription.medicine?.id,
            totalQuantity:
              prescription.supplyDuration *
              prescription.frequency *
              prescription.doseQuantity,
          });

          setOnAddPrescription(undefined);
          setOnEditPrescription(undefined);
        }}
        open={Boolean(onAddPrescription) || Boolean(onEditPrescription)}
        title={onAddPrescription ? "Add Prescription" : "Edit Prescription"}
      />
    </>
  );
}
