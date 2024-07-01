import { ClinicMedicalRecordTemplate } from "@/features/clinic-medical-record/routes/clinic-medical-record-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicMedicalRecordTemplate>{children}</ClinicMedicalRecordTemplate>;
}
