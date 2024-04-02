import { CheckBadgeIcon } from "@/components/icons/check-badge";
import { Badge } from "@/components/ui/badge";

import { features } from "../utils";
import { SectionContainer } from "./shared/section-container";

export function Digitalization(): JSX.Element {
  return (
    <div className="w-screen bg-background">
      <SectionContainer className="pb-[169px]">
        <Badge className="text-background bg-secondary font-extrabold px-3 py-2 rounded-none hover:bg-secondary">
          DIGITALISASI KLINIK
        </Badge>
        <h2 className="text-secondary text-[60px] font-extrabold mb-12 mt-5">
          Pelayanan menjadi lebih mudah
        </h2>
        <div className="flex flex-col gap-10">
          {features.map((item) => (
            <div className="flex flex-row gap-4" key={item.title}>
              <CheckBadgeIcon className="fill-secondary" size={40} />
              <div className="flex flex-col gap-2">
                <p className="text-secondary text-[32px] font-bold">
                  {item.title}
                </p>
                <p className="text-secondary text-xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
