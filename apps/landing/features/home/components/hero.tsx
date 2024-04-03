import { Button } from "@/components/ui/button";

import { SectionContainer } from "./shared/section-container";

export function Hero(): JSX.Element {
  return (
    <div className="w-screen">
      <SectionContainer className="flex flex-col items-center pt-[120px] sm:pt-[160px] md:pt-[160px] lg:pt-[160px] xl:pt-[180px] 2xl:pt-[180px] pb-[40px] sm:pb-[40px] md:pb-[40px] lg:pb-[40px] xl:pb-[60px] 2xl:pb-[60px]">
        <h1 className="text-8xl text-center font-extrabold text-secondary">
          Klinik Resmi Satu Sehat.
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl text-center font-extrabold text-secondary">
          Tanpa Ribet.
        </h1>
        <p className="text-center text-secondary mt-[30px] mb-[34px]">
          Pengelolaan klinik menjadi lebih mudah dan lancar. SatuKlinik hadir
          untuk menyederhanakan setiap aspek operasional klinik Anda.
        </p>
        <Button className="px-6 py-5 h-min text-black text-2xl font-bold mb-[44px] shadow-[0_-2px_2px_0px_rgba(0, 0, 0, 0.25)_inset]">
          Jadwalkan Demo
        </Button>
        <img
          alt="Hero"
          src="/home/hero-image.png"
          className="w-full max-w-[1015px]"
        />
      </SectionContainer>
    </div>
  );
}
