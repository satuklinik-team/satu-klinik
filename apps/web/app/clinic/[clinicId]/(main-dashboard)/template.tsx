import { ClinicDashboardTemplate } from "@/features/clinic-dashboard/routes/clinic-dashboard-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicDashboardTemplate>{children}</ClinicDashboardTemplate>;
}
