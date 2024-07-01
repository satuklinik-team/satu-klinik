import { ClinicUserDetailTemplate } from "@/features/clinic-user-detail/routes/clinic-user-detail-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicUserDetailTemplate>{children}</ClinicUserDetailTemplate>;
}
