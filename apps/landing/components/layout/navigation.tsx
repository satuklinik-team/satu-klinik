import { Menu } from "lucide-react";
import Image from "next/image";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SectionContainer } from "@/features/home/components/shared/section-container";

import { Button } from "../ui/button";

export function Navigation(): JSX.Element {
  return (
    <nav className="fixed w-screen bg-background shadow-sm">
      <SectionContainer className="flex flex-row justify-between items-center py-[26px] sm:py-[26px] md:py-[26px] lg:py-[26px] xl:py-[26px] 2xl:py-[26px]">
        <Image
          alt="Brand Logo"
          className="w-[200px] sm:w-[253px] md:w-[253px] lg:w-[253px] xl:w-[253px] 2xl:w-[253px] h-[34.7px] sm:h-[44px] md:h-[44px] lg:h-[44px] xl:h-[44px] 2xl:h-[44px]"
          height={44}
          src="/brand-logo.png"
          width={253}
        />
        <div className="flex-row items-center gap-10 font-bold hidden xl:flex 2xl:flex">
          <p className="cursor-pointer">Integrasi Aplikasi</p>
          <p className="cursor-pointer">Harga</p>
          <p className="cursor-pointer">Pertanyaan Umum</p>
          <p className="cursor-pointer">Tentang Kami</p>
        </div>
        <Button className="text-black font-bold hidden xl:block 2xl:block">
          Jadwalkan Demo
        </Button>

        <Drawer direction="right">
          <DrawerTrigger className="block xl:hidden 2xl:hidden">
            <Menu className="stroke-foreground" size={28} />
          </DrawerTrigger>
          <DrawerContent className="w-screen max-w-[480px] h-full bg-background p-12 rounded-none">
            <div className="flex flex-col gap-8 mb-10 font-bold">
              <p className="cursor-pointer">Integrasi Aplikasi</p>
              <p className="cursor-pointer">Harga</p>
              <p className="cursor-pointer">Pertanyaan Umum</p>
              <p className="cursor-pointer">Tentang Kami</p>
            </div>
            <Button className="text-black font-bold">Jadwalkan Demo</Button>
          </DrawerContent>
        </Drawer>
      </SectionContainer>
    </nav>
  );
}
