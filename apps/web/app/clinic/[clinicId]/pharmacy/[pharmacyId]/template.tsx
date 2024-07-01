import { ClinicPharmacyFinishTemplate } from "@/features/clinic-pharmacy-finish/routes/clinic-pharmacy-finish-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <ClinicPharmacyFinishTemplate>{children}</ClinicPharmacyFinishTemplate>
  );
}
