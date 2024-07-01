import { ClinicUsersTemplate } from "@/features/clinic-users/routes/clinic-users-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicUsersTemplate>{children}</ClinicUsersTemplate>;
}
