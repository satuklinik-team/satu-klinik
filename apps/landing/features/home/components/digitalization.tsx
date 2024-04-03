// import Image from "next/image";

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
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold mb-12 mt-5">
          Pelayanan menjadi lebih mudah
        </h2>
        <div className="flex flex-col gap-10">
          {digitalizations.map((item) => (
            <FeatureBenefitItem
              description={item.description}
              key={item.title}
              title={item.title}
            />
          ))}
        </div>
        {/* <div className="absolute bottom-0 right-[100px]">
          <Image
            alt="Digitalization Preview"
            className="translate-y-[86px]"
            height={229.59}
            src="/home/digitalization-preview.png"
            width={470}
          />
          <Image
            alt="Curly Arrow"
            className="translate-x-[240px] translate-y-[114px]"
            height={130.8}
            src="/curly-arrow.png"
            width={46.58}
          />
          <Image
            alt="Digitalization Image"
            height={269.78}
            src="/home/digitalization-image.png"
            width={457.35}
          />
          <Image
            alt="Brand Logo"
            height={192.44}
            src="/brand-logo-2.png"
            width={191.22}
          />
        </div> */}
      </SectionContainer>
    </div>
  );
}
