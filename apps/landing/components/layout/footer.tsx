import Image from "next/image";

import { SectionContainer } from "@/features/home/components/shared/section-container";

export function Footer(): JSX.Element {
  return (
    <>
      <div className="w-screen bg-background">
        <SectionContainer className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center sm:items-center md:items-start lg:items-start xl:items-start 2xl:items-start justify-between gap-8">
          <div className="flex flex-col gap-8 items-center sm:items-center md:items-start lg:items-start xl:items-start 2xl:items-start">
            <Image
              alt="Brand Logo"
              height={60}
              src="/brand-logo.png"
              width={345}
            />

            <p className="text-secondary text-xl max-w-[485px] text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
              Pengelolaan klinik menjadi lebih mudah dan lancar. SatuKlinik
              hadir untuk menyederhanakan setiap aspek operasional klinik Anda.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-secondary text-xl max-w-[324px] items-center sm:items-center md:items-start lg:items-start xl:items-start 2xl:items-start">
            <p className="text-base font-extrabold">TENTANG</p>
            <p>Tentang Kami</p>
            <p>Syarat & Ketentuan</p>
            <p>Kebijakan Privasi</p>
          </div>

          <div className="flex flex-col gap-4 text-secondary text-xl max-w-[324px] items-center sm:items-center md:items-start lg:items-start xl:items-start 2xl:items-start">
            <p className="text-base font-extrabold">KONTAK</p>
            <p>0812-3456-7890</p>
            <p>solusi@satuklinik.com</p>
            <p className="text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
              Jl. Elang IV, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan,
              Banten 15413
            </p>
          </div>
        </SectionContainer>
      </div>
      <div className="w-screen bg-secondary items-center justify-center py-3">
        <p className="text-xl text-background text-center">
          Copyright ©{new Date().getFullYear()} satuklinik.com
        </p>
      </div>
    </>
  );
}
