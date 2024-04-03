import { Menu } from "lucide-react";
import Image from "next/image";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SectionContainer } from "@/features/home/components/shared/section-container";

import { Button } from "../ui/button";

export function Navigation(): JSX.Element {
  return (
    <div className="fixed w-screen bg-background shadow-sm">
      <SectionContainer className="flex flex-row justify-between items-center py-[26px] sm:py-[26px] md:py-[26px] lg:py-[26px] xl:py-[26px] 2xl:py-[26px]">
        <Image
          alt="Brand Logo"
          className="w-[253px] h-[44px]"
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
          <DrawerTrigger>
            <Button className="block xl:hidden 2xl:hidden" variant="ghost">
              <Menu className="stroke-foreground" size={28} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full bg-background" />
        </Drawer>
      </SectionContainer>
    </div>
  );
}
