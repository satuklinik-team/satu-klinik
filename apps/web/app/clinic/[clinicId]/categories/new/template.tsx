import { ClinicNewCategoryTemplate } from "@/features/clinic-new-category/routes/clinic-new-category-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicNewCategoryTemplate>{children}</ClinicNewCategoryTemplate>;
}
