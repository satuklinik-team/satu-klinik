import Image from "next/image";

import { SectionContainer } from "@/features/home/components/shared/section-container";

import { Button } from "../ui/button";

export function Navigation(): JSX.Element {
  return (
    <SectionContainer className="fixed flex flex-row justify-between items-center py-[26px] bg-background shadow-sm z-50">
      <Image alt="Brand Logo" height={44} src="/brand-logo.png" width={253} />
      <div className="flex flex-row items-center gap-10 font-bold">
        <p className="cursor-pointer">Integrasi Aplikasi</p>
        <p className="cursor-pointer">Harga</p>
        <p className="cursor-pointer">Pertanyaan Umum</p>
        <p className="cursor-pointer">Tentang Kami</p>
      </div>
      <Button className="text-black font-bold">Jadwalkan Demo</Button>
    </SectionContainer>
  );
}
