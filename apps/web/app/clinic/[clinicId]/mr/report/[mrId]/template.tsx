import { ClinicMedicalRecordDetailTemplate } from "@/features/clinic-medical-record-detail/routes/clinic-medical-record-detail-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <ClinicMedicalRecordDetailTemplate>
      {children}
    </ClinicMedicalRecordDetailTemplate>
  );
}
