import { MembersFooter } from "@/features/members/components/layout/footer";
import { MembersNavigation } from "@/features/members/components/layout/navigation";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-row w-screen h-screen">
      <MembersNavigation />
      {children}
      <MembersFooter />
    </div>
  );
}
