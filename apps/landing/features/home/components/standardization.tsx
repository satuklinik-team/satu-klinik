import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { standardizations } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function Standardization(): JSX.Element {
  return (
    <div className="w-screen bg-[#EEE8CF]">
      <SectionContainer className="relative">
        <Badge className="text-background bg-foreground font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          STANDARISASI & INTEGRASI
        </Badge>
        <h2 className="text-foreground text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] font-extrabold mb-12 mt-5">
          Jadi Bagian RME Satu Sehat Tanpa Ribet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10">
          {standardizations.map((item) => (
            <FeatureBenefitItem
              classNames={{
                title: "text-foreground",
                description: "text-foreground",
              }}
              description={item.description}
              key={item.title}
              leftIcon={
                <CheckBadgeIcon
                  className="fill-foreground shrink-0"
                  classNames={{ tick: "fill-[#EEE8CF]" }}
                  size={40}
                />
              }
              title={item.title}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
