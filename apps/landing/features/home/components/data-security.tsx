import Image from "next/image";

import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { dataSecurityBenefits } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function DataSecurity(): JSX.Element {
  return (
    <div className="w-screen bg-primary">
      <SectionContainer className="relative">
        <Badge className="text-primary bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          KEAMANAN DATA
        </Badge>
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold mt-5 mb-5 sm:mb-5 md:mb-5 lg:mb-12 xl:mb-12 2xl:mb-12">
          Perlindungan Data yang Komprehensif
        </h2>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between items-start sm:items-start md:items-start xl:items-center 2xl:items-center gap-8 sm:gap-12 md:gap-16 lg:gap-16 xl:gap-24 2xl:gap-24">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="w-[82px] h-3 bg-primary rounded-md" />
              <p className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl text-secondary font-extrabold">
                KEUNTUNGAN KLINIK
              </p>
            </div>

            {dataSecurityBenefits.map((item) => (
              <FeatureBenefitItem
                classNames={{
                  title: "text-secondary",
                  description: "text-secondary",
                }}
                description={item.description}
                key={item.title}
                leftIcon={
                  <CheckBadgeIcon
                    className="fill-secondary shrink-0"
                    classNames={{ tick: "fill-primary" }}
                    size={40}
                  />
                }
                title={item.title}
              />
            ))}
          </div>
          <div className=" w-fit h-fit">
            <Image
              alt="Data Security Image"
              className="shrink-0"
              height={542}
              src="/home/data-security-image.png"
              width={597}
            />
          </div>
        </div>
        <Image
          alt="Brand Logo"
          className="absolute right-0 bottom-0 opacity-40"
          height={263.45}
          src="/brand-logo-2.png"
          width={265.13}
        />
      </SectionContainer>
    </div>
  );
}
