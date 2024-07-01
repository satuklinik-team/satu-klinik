import { ClinicPharmacyTemplate } from "@/features/clinic-pharmacy/routes/clinic-pharmacy-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicPharmacyTemplate>{children}</ClinicPharmacyTemplate>;
}
