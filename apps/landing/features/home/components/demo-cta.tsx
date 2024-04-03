import Image from "next/image";

import { Button } from "@/components/ui/button";

import { SectionContainer } from "./shared/section-container";

export function DemoCta(): JSX.Element {
  return (
    <div className="w-screen bg-foreground">
      <SectionContainer className="flex flex-row justify-between gap-24">
        <div className="flex flex-col gap-5">
          <h2 className="text-[60px] text-background font-bold">
            Optimalkan Kinerja Klinik dengan SatuKlinik!
          </h2>
          <p className="text-background text-xl">
            Daftar sekarang dan dapatkan akun Anda, atau jadwalkan demo bersama
            tim kami.
          </p>
          <Button className="px-6 py-5 h-min text-black text-2xl font-bold mb-[44px] shadow-[0_-2px_2px_0px_rgba(0, 0, 0, 0.25)_inset]">
            Jadwalkan Demo
          </Button>
        </div>

        <Image
          alt="Demo Barcode"
          height={477}
          src="/home/demo-barcode.png"
          width={477}
        />
      </SectionContainer>
    </div>
  );
}
