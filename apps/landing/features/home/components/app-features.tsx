import { Badge } from "@/components/ui/badge";

import { SectionContainer } from "./shared/section-container";

export function AppFeatures(): JSX.Element {
  return (
    <div className="w-screen bg-background">
      <SectionContainer className="flex flex-col items-center">
        <Badge className="text-background bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          FITUR APLIKASI
        </Badge>
        <h2 className="text-secondary text-center text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold mt-5 mb-[32px] sm:mb-[48px] md:mb-[64px] lg:mb-[64px] xl:mb-[100px] 2xl:mb-[100px]">
          Aplikasi Klinik Terintegrasi
        </h2>
        <img src="/home/app-features.png" alt="App Features" />
      </SectionContainer>
    </div>
  );
}
