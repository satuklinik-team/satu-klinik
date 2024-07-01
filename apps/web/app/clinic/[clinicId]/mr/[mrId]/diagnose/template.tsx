import { ClinicDiagnosePatientTemplate } from "@/features/clinic-diagnose-patient/routes/clinic-diagnose-patient-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <ClinicDiagnosePatientTemplate>{children}</ClinicDiagnosePatientTemplate>
  );
}
