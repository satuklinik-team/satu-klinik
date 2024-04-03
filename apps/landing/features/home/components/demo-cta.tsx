import Image from "next/image";

import { Button } from "@/components/ui/button";

import { SectionContainer } from "./shared/section-container";

export function DemoCta(): JSX.Element {
  return (
    <div className="w-screen bg-foreground">
      <SectionContainer className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center xs:items-center sm:items-center md:items-center lg:items-start xl:items-start 2xl:items-start gap-8 xs:gap-8 sm:gap-8 md:gap-8 lg:gap-24 xl:gap-24 2xl:gap-24">
        <div className="flex flex-col gap-5 items-center xs:items-center sm:items-center md:items-center lg:items-start xl:items-start 2xl:items-start">
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-[60px] 2xl:text-[60px] text-background font-bold text-center xs:text-center sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left">
            Optimalkan Kinerja Klinik dengan SatuKlinik!
          </h2>
          <p className="text-background text-xl text-center xs:text-center sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left">
            Daftar sekarang dan dapatkan akun Anda, atau jadwalkan demo bersama
            tim kami.
          </p>
          <Button className="px-6 py-5 h-min w-min text-black text-2xl font-bold mb-[44px] shadow-[0_-2px_2px_0px_rgba(0, 0, 0, 0.25)_inset]">
            Jadwalkan Demo
          </Button>
        </div>

        <div className="h-fit">
          <Image
            alt="Demo Barcode"
            height={477}
            src="/home/demo-barcode.png"
            width={477}
          />
        </div>
      </SectionContainer>
    </div>
  );
}
