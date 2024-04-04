import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SectionContainer } from "@/features/home/components/shared/section-container";

import { Button } from "../ui/button";

export function Navigation(): JSX.Element {
  return (
    <nav className="fixed w-screen bg-background shadow-sm">
      <SectionContainer className="flex flex-row justify-between items-center py-[26px] sm:py-[26px] md:py-[26px] lg:py-[26px] xl:py-[26px] 2xl:py-[26px]">
        <Image
          alt="Brand Logo"
          className="w-[200px] sm:w-[253px] md:w-[253px] lg:w-[253px] xl:w-[253px] 2xl:w-[253px] h-[34.7px] sm:h-11 md:h-11 lg:h-11 xl:h-11 2xl:h-11"
          height={44}
          src="/brand-logo.png"
          width={253}
        />
        <ul className="flex-row items-center gap-10 font-bold hidden xl:flex 2xl:flex">
          <li className="cursor-pointer">
            <Link href="">Integrasi Aplikasi</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="">Harga</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="">Pertanyaan Umum</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="">Tentang Kami</Link>
          </li>
        </ul>
        <Link href="">
          <Button className="text-black font-bold hidden xl:block 2xl:block">
            Jadwalkan Demo
          </Button>
        </Link>

        <Drawer direction="right">
          <DrawerTrigger className="block xl:hidden 2xl:hidden">
            <Menu className="stroke-foreground" size={28} />
          </DrawerTrigger>
          <DrawerContent className="w-screen max-w-[480px] h-full bg-background p-xl rounded-none">
            <ul className="flex flex-col gap-8 mb-lg font-bold">
              <li className="cursor-pointer">
                <Link href="">Integrasi Aplikasi</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="">Harga</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="">Pertanyaan Umum</Link>
              </li>
              <li className="cursor-pointer">
                <Link href="">Tentang Kami</Link>
              </li>
            </ul>
            <Link className="w-full" href="">
              <Button className="w-full text-black font-bold">
                Jadwalkan Demo
              </Button>
            </Link>
          </DrawerContent>
        </Drawer>
      </SectionContainer>
    </nav>
  );
}
