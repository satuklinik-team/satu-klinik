import { ClinicCategoriesTemplate } from "@/features/clinic-categories/routes/clinic-categories-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicCategoriesTemplate>{children}</ClinicCategoriesTemplate>;
}
