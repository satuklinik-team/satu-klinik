import { ClinicItemDetailTemplate } from "@/features/clinic-item-detail/routes/clinic-item-detail-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicItemDetailTemplate>{children}</ClinicItemDetailTemplate>;
}
