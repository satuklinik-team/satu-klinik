import { Button } from "@/components/ui/button";

import { SectionContainer } from "./shared/section-container";

export function Hero(): JSX.Element {
  return (
    <div className="w-screen">
      <SectionContainer className="flex flex-col items-center">
        <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl text-center font-extrabold text-secondary">
          Klinik Resmi Satu Sehat.
        </h1>
        <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl text-center font-extrabold text-secondary">
          Tanpa Ribet.
        </h1>
        <p className="text-center text-secondary mt-[30px] mb-[34px]">
          Pengelolaan klinik menjadi lebih mudah dan lancar. SatuKlinik hadir
          untuk menyederhanakan setiap aspek operasional klinik Anda.
        </p>
        <Button className="px-6 py-5 text-black text-2xl font-bold mb-[44px] shadow-[0_-2px_2px_0px_rgba(0, 0, 0, 0.25)_inset]">
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
