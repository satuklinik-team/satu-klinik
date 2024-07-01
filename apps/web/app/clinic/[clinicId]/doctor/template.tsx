import { ClinicDoctorTemplate } from "@/features/clinic-doctor/routes/clinic-doctor-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicDoctorTemplate>{children}</ClinicDoctorTemplate>;
}
