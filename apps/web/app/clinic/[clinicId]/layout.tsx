import { LeftBar } from "@/features/clinic/components/layout/left-bar";
import { TopBar } from "@/features/clinic/components/layout/top-bar";

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-row w-screen h-screen">
      <LeftBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
