import { ClinicNewItemTemplate } from "@/features/clinic-new-item/routes/clinic-new-item-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicNewItemTemplate>{children}</ClinicNewItemTemplate>;
}
