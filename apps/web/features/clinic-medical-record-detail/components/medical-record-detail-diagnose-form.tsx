import { useParams, useSearchParams } from "next/navigation";

import { useUpdatePatientAssessment } from "@/services/patient-assessment/hooks/use-update-patient-assessment";
import type { PatientMedicalRecordEntity } from "@/services/patient-medical-record/types/entity";
import type { RouteParams } from "@/types";

import { DiagnosePatientForm } from "./form";

interface MedicalRecordDetailDiagnoseForm {
  medicalRecord: Required<PatientMedicalRecordEntity>;
}

export function MedicalRecordDetailDiagnoseForm({
  medicalRecord,
}: MedicalRecordDetailDiagnoseForm): React.JSX.Element {
  const { mrId } = useParams<RouteParams>();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";

  const assessment =
    medicalRecord.assessment[medicalRecord.assessment.length - 1];

  const { isPending, mutateAsync } = useUpdatePatientAssessment(assessment.id);

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

        return Boolean(data);
      }}
    />
  );
}
