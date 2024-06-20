import { useParams, useSearchParams } from "next/navigation";

import { useUpdatePatientAssessment } from "@/services/patient-assessment/hooks/use-update-patient-assessment";
import type { PatientAssessmentEntity } from "@/services/patient-assessment/types/entity";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";

import { DiagnosePatientForm } from "./form";
import { useToast } from "@/components/ui/use-toast";

interface MedicalRecordDetailDiagnoseForm {
  medicalRecord: Required<PatientMedicalRecordEntity>;
}

export function MedicalRecordDetailDiagnoseForm({
  medicalRecord,
}: MedicalRecordDetailDiagnoseForm): React.JSX.Element {
  const { mrId } = useParams<RouteParams>();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const { toast } = useToast();

  const assessment: PatientAssessmentEntity =
    medicalRecord.assessment[medicalRecord.assessment.length - 1] ?? {};
  const { isPending, mutateAsync } = useUpdatePatientAssessment(assessment.id);

  if (!assessment.id)
    return (
      <div className="-mt-4 w-full text-center">
        <p className="text-base">Belum ada data diagnosa</p>
      </div>
    );

  return (
    <DiagnosePatientForm
      defaultValues={{
        icd10Code: assessment.icd10Code,
        icd9CMCode: assessment.icd9CMCode,
        mrid: mrId,
        prescriptions: medicalRecord.prescription,
        plan: assessment.plan,
        assessment: assessment.assessment,
        objective: assessment.objective,
        subjective: assessment.subjective,
      }}
      isLoading={isPending}
      isReadOnly={!isEdit}
      onSubmit={async (values) => {
        const data = await mutateAsync(values);

        toast({
          title: "Berhasil edit data medical record!",
          variant: "success",
        });
        return Boolean(data);
      }}
    />
  );
}
