import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { standardization } from "../utils";
import { SectionContainer } from "./shared/section-container";
import { FeatureBenefitItem } from "./ui/feature-benefit-item";

export function Standardization(): JSX.Element {
  return (
    <div className="w-screen bg-[#EEE8CF]">
      <SectionContainer className="relative">
        <Badge className="text-background bg-foreground font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          STANDARISASI & INTEGRASI
        </Badge>
        <h2 className="text-foreground text-[60px] font-extrabold mb-12 mt-5">
          Jadi Bagian RME Satu Sehat Tanpa Ribet
        </h2>
        <div className="grid grid-cols-2 gap-10">
          {standardization.map((item) => (
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
