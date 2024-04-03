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
        <h2 className="text-background text-[60px] font-extrabold my-5">
          Kami Bantu Digital Marketing
        </h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="w-[82px] h-3 bg-primary rounded-md" />
              <p className="text-4xl text-background font-extrabold">
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

          <div className="relative">
            <Image
              alt="Blurred Map"
              height={640.41}
              src="/home/blurred-map.png"
              width={556}
            />
            <Image
              alt="Circle Map"
              className="absolute right-[70px] bottom-[-74px]"
              height={343.38}
              src="/home/circle-map.png"
              width={343.79}
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
