"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

// import { ClinicDiagnosePatientPrescriptionForm } from "./prescription-form";
// import { ClinicDiagnosePatientPrescriptionTable } from "./prescription-table";

interface DiagnosePatientFormProps {
  isReadOnly?: boolean;
  onSubmit: SubmitHandler<CreatePatientAssessmentSchema>;
  defaultValues?: DefaultValues<CreatePatientAssessmentSchema>;
}

export function DiagnosePatientForm({
  isReadOnly,
  onSubmit,
  defaultValues,
}: DiagnosePatientFormProps): JSX.Element {
  const form = useForm<CreatePatientAssessmentSchema>({
    resolver: zodResolver(createPatientAssessmentSchema),
    defaultValues,
  });

  // const { mutateAsync } = useCreatePatientAssessment();

  // const onSubmit = useCallback(
  //   async (data: CreatePatientAssessmentDto) => {
  //     await mutateAsync({
  //       ...data,
  //       prescriptions: [
  //         ...(data.prescriptions?.map((item) => ({
  //           ...item,
  //           medicineId: Number(item.medicine?.id) as unknown as string,
  //           medicine: undefined,
  //         })) ?? []),
  //       ],
  //     });

  //     toast({ title: "Berhasil Membuat Diagnosa!", variant: "success" });

  //     await Promise.all([
  //       queryClient.invalidateQueries({
  //         queryKey: new PharmacyTaskQueryKeyFactory().lists(),
  //       }),
  //       queryClient.invalidateQueries({
  //         queryKey: new TasksStatusQueryKeyFactory().notifications(),
  //       }),
  //       queryClient.invalidateQueries({
  //         queryKey: new TasksStatusQueryKeyFactory().list({ type: "DOCTOR" }),
  //       }),
  //     ]);

  //     router.push(`/clinic/${clinicId}/doctor`);
  //   },
  //   [clinicId, mutateAsync, queryClient, router, toast]
  // );

  // useEffect(() => {
  //   if (!medicalRecordData?.vitalSign?.length) return;

  //   const defaultSubjective = medicalRecordData.vitalSign[0].pain;

  //   if (defaultSubjective) {
  //     form.setValue("subjective", defaultSubjective);
  //   }
  // }, [form, medicalRecordData]);

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

        {/* <div className="space-y-2 mt-3">
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
          </div> */}
        {!isReadOnly && (
          <div className="flex flex-row justify-end">
            <Button className="mt-4">Simpan</Button>
          </div>
        )}
      </form>
    </Form>
  );
}
