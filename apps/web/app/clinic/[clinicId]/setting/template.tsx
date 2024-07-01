import { ClinicGeneralSettingsTemplate } from "@/features/clinic-general-settings/routes/clinic-general-settings-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return (
    <ClinicGeneralSettingsTemplate>{children}</ClinicGeneralSettingsTemplate>
  );
}
