import { ClinicItemsTemplate } from "@/features/clinic-items/routes/clinic-items-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicItemsTemplate>{children}</ClinicItemsTemplate>;
}
