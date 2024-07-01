import { ClinicPatientDetailTemplate } from "@/features/clinic-patient-detail/routes/clinic-patient-detail-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicPatientDetailTemplate>{children}</ClinicPatientDetailTemplate>;
}
