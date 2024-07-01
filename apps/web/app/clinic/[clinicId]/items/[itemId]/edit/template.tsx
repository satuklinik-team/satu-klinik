import { ClinicEditItemTemplate } from "@/features/clinic-edit-item/routes/clinic-edit-item-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicEditItemTemplate>{children}</ClinicEditItemTemplate>;
}
