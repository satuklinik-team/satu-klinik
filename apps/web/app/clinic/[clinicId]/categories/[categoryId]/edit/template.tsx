import { ClinicEditCategoryTemplate } from "@/features/clinic-edit-category/routes/clinic-edit-category-template";

export default function Template({
  children,
}: React.PropsWithChildren): React.JSX.Element {
  return <ClinicEditCategoryTemplate>{children}</ClinicEditCategoryTemplate>;
}
