import { ClinicPatientTemplate } from "@/features/clinic-patient/routes/clinic-patient-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicPatientTemplate>{children}</ClinicPatientTemplate>;
}
