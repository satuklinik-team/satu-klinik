import { ClinicEditPatientTemplate } from "@/features/clinic-edit-patient/routes/clinic-edit-patient-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicEditPatientTemplate>{children}</ClinicEditPatientTemplate>;
}
