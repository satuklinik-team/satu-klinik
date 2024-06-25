import { LeftBar } from "@/features/clinic/components/layout/left-bar";
import { TopBar } from "@/features/clinic/components/layout/top-bar";

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-row w-screen h-screen">
      <LeftBar className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex" />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-grow overflow-auto" id="clinic-layout">
          <div className="min-h-dashboard-content px-4 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
