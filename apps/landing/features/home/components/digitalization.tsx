import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { digitalizations } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function Digitalization(): JSX.Element {
  return (
    <div className="w-screen bg-background">
      <SectionContainer className="relative pb-[169px]">
        <Badge className="text-background bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          DIGITALISASI KLINIK
        </Badge>
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold mb-xl mt-md">
          Pelayanan menjadi lebih mudah
        </h2>
        <div className="mb-[320px] sm:mb-[450px] md:mb-[480px] lg:mb-[640px] xl:mb-0 2xl:mb-0">
          <div className="flex flex-col gap-10">
            {digitalizations.map((item) => (
              <FeatureBenefitItem
                description={item.description}
                key={item.title}
                title={item.title}
              />
            ))}
          </div>
          <Image
            alt="Digitalization Image Group"
            className="absolute bottom-0 translate-x-1/2 sm:translate-x-1/2 md:translate-x-1/2 lg:translate-x-1/2 right-1/2 sm:right-1/2 md:right-1/2 lg:right-1/2 xl:right-[300px] 2xl:right-[300px] w-[400px] sm:w-[502px] md:w-[502px] lg:w-[600px] xl:w-[502px] 2xl:w-[600.35px] h-[420px] sm:h-[480.63px] md:h-[480.63px] lg:h-[600px] xl:h-[480.63px] 2xl:h-[600px]"
            height={642}
            src="/home/digitalization-image-group.png"
            width={652.35}
          />
        </div>
      </SectionContainer>
    </div>
  );
}
