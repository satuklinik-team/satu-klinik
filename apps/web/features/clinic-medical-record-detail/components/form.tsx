"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ICD9CMInput } from "@/features/clinic-diagnose-patient/components/inputs/icd9cm-input";
import { ICD10nput } from "@/features/clinic-diagnose-patient/components/inputs/icd10-input";
import type { CreatePatientAssessmentSchema } from "@/services/patient-assessment/types/dto";
import { createPatientAssessmentSchema } from "@/services/patient-assessment/types/dto";

import { PrescriptionTable } from "./prescription/table";

interface DiagnosePatientFormProps {
  isReadOnly?: boolean;
  onSubmit: SubmitHandler<CreatePatientAssessmentSchema>;
  defaultValues?: DefaultValues<CreatePatientAssessmentSchema>;
  isLoading?: boolean;
  onValuesChange?: (values: CreatePatientAssessmentSchema) => unknown;
  intervalTime?: number;
}

export function DiagnosePatientForm({
  isReadOnly,
  onSubmit,
  defaultValues,
  isLoading,
  onValuesChange,
  intervalTime = 1000,
}: DiagnosePatientFormProps): JSX.Element {
  const form = useForm<CreatePatientAssessmentSchema>({
    resolver: zodResolver(createPatientAssessmentSchema),
    defaultValues,
  });

  const onValuesChangeRef =
    useRef<DiagnosePatientFormProps["onValuesChange"]>(onValuesChange);

  useEffect(() => {
    if (!onValuesChange) return;

    onValuesChangeRef.current = onValuesChange;
  }, [onValuesChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!onValuesChangeRef.current) return;

      onValuesChangeRef.current(form.getValues());
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [form, intervalTime]);

  useEffect(() => {
    if (!defaultValues) return;

    form.reset(defaultValues);
  }, [defaultValues, form]);

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
                  readOnly={isReadOnly}
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
                  readOnly={isReadOnly}
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
                  readOnly={isReadOnly}
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
            return (
              <FormItem>
                <FormLabel>ICD10</FormLabel>
                <FormControl>
                  <ICD10nput
                    key={value}
                    onChange={onChange}
                    readOnly={isReadOnly}
                    value={value}
                  />
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
                  readOnly={isReadOnly}
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
            return (
              <FormItem>
                <FormLabel>ICD9CM / Tindakan</FormLabel>
                <FormControl>
                  <ICD9CMInput
                    key={value}
                    onChange={onChange}
                    readOnly={isReadOnly}
                    value={value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="prescriptions"
          render={({ field: { value, onChange } }) => {
            return (
              <FormItem>
                <FormLabel>Prescriptions</FormLabel>
                <FormControl>
                  <PrescriptionTable
                    onChange={onChange}
                    readOnly={isReadOnly}
                    value={value ?? []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {!isReadOnly && (
          <div className="flex w-full">
            <Button className="mt-4 w-full" disabled={isLoading}>
              {!isLoading ? "Simpan" : "Loading..."}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
