import { Badge } from "@/components/ui/badge";

import { SectionContainer } from "./shared/section-container";

export function AppFeatures(): JSX.Element {
  return (
    <div className="w-screen bg-background">
      <SectionContainer className="flex flex-col items-center">
        <Badge className="text-background bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          FITUR APLIKASI
        </Badge>
        <h2 className="text-secondary text-[60px] font-extrabold mt-5 mb-[100px]">
          Aplikasi Klinik Terintegrasi
        </h2>
        <img src="/home/app-features.png" alt="App Features" />
      </SectionContainer>
    </div>
  );
}
