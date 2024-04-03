import Image from "next/image";

import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { digitalMarketingBenefits } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function DigitalMarketing(): JSX.Element {
  return (
    <div className="w-screen bg-secondary">
      <SectionContainer className="relative">
        <Badge className="text-secondary bg-background font-extrabold px-3 py-2 rounded-none hover:bg-background">
          DIGITAL MARKETING
        </Badge>
        <h2 className="text-background text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold my-5">
          Kami Bantu Digital Marketing
        </h2>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-16 xl:gap-36 2xl:gap-36">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="w-[82px] h-3 bg-primary rounded-md" />
              <p className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl text-background font-extrabold">
                KEUNTUNGAN KLINIK
              </p>
            </div>

            {digitalMarketingBenefits.map((item) => (
              <FeatureBenefitItem
                classNames={{
                  title: "text-background",
                  description: "text-background",
                }}
                description={item.description}
                key={item.title}
                leftIcon={
                  <CheckBadgeIcon
                    className="fill-background shrink-0"
                    classNames={{ tick: "fill-secondary" }}
                    size={40}
                  />
                }
                title={item.title}
              />
            ))}
          </div>

          <div className="relative w-fit h-fit">
            <Image
              alt="Blurred Map"
              className="mt-0 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-12 2xl:mt-12"
              height={640.41}
              src="/home/blurred-map.png"
              width={556}
            />
            <Image
              alt="Circle Map"
              className="absolute hidden sm:block md:block lg:block xl:block 2xl:block right-[10%] sm:right-[10%] md:right-[10%] lg:right-[10%] xl:right-[10%] 2xl:right-[10%] -bottom-[24px] sm:-bottom-[48px] md:-bottom-[40px] lg:-bottom-[80px] xl:-bottom-[80px] 2xl:-bottom-[80px]"
              height={300.38}
              src="/home/circle-map.png"
              width={300.79}
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
