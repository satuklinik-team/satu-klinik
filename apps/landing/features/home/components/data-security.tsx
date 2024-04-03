import Image from "next/image";

import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { dataSecurityBenefits } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function DataSecurity(): JSX.Element {
  return (
    <div className="relative w-screen bg-primary">
      <SectionContainer>
        <Badge className="text-primary bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          KEAMANAN DATA
        </Badge>
        <h2 className="text-secondary text-[60px] font-extrabold mt-5 mb-12">
          Perlindungan Data yang Komprehensif
        </h2>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="w-[82px] h-3 bg-primary rounded-md" />
            <p className="text-4xl text-secondary font-extrabold">
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
      </SectionContainer>

      <Image
        alt="Data Security Image"
        className="absolute right-[133px] bottom-[131.65px]"
        height={542}
        src="/home/data-security-image.png"
        width={597}
      />

      <Image
        alt="Brand Logo"
        className="absolute right-0 bottom-0 opacity-40"
        height={263.45}
        src="/brand-logo-2.png"
        width={265.13}
      />
    </div>
  );
}
