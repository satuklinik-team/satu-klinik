import { MembersFooter } from "@/features/members/components/layout/footer";
import { MembersNavigation } from "@/features/members/components/layout/navigation";
import { Container } from "@/features/members/components/shared/container";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col w-screen h-screen">
      <MembersNavigation />
      <Container className="pb-16 pt-0 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0 mt-28">
        {children}
      </Container>
      <MembersFooter />
    </div>
  );
}
