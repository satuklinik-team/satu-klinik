import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { SectionContainer } from "./shared/section-container";

export function AppFeatures(): JSX.Element {
  return (
    <div className="w-screen bg-background">
      <SectionContainer className="flex flex-col items-center">
        <Badge className="text-background bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          FITUR APLIKASI
        </Badge>
        <h2 className="text-secondary text-center text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-extrabold mt-5 mb-8 sm:mb-xl md:mb-16 lg:mb-16 xl:mb-3xl 2xl:mb-3xl">
          Aplikasi Klinik Terintegrasi
        </h2>
        <Image
          alt="App Features"
          className="w-full"
          height={523.65}
          src="/home/app-features.png"
          width={1328}
        />
      </SectionContainer>
    </div>
  );
}
