"use client";

import Image from "next/image";
import Link from "next/link";

import { NotificationPanel } from "@/components/layout/notification-panel";
import { UserButton } from "@/components/layout/user-button";
import { Badge } from "@/components/ui/badge";

import { Container } from "../shared/container";

export function MembersNavigation(): JSX.Element {
  return (
    <nav className="fixed w-screen shadow-sm bg-white z-50">
      <Container className="flex flex-row justify-between items-center py-md sm:py-md md:py-3 lg:py-4 xl:py-4 2xl:py-4">
        <div className="flex flex-row items-center gap-8">
          <Image
            alt="Brand Logo"
            className="w-10 h-10"
            height={44}
            src="/brand-logo-2.png"
            width={253}
          />

          <div className="flex-row items-center gap-2 hidden sm:flex md:flex lg:flex xl:flex 2xl:flex">
            <p className="text-sm">Welcome, Nona Perma</p>
            <Badge className="text-xs px-2.5 py-1 bg-border" variant="outline">
              Owner
            </Badge>
          </div>
        </div>

        <ul className="flex flex-row items-center gap-6">
          <li>
            <Link href="">
              <p className="text-sm">Docs</p>
            </Link>
          </li>
          <li>
            <NotificationPanel />
          </li>
          <li>
            <UserButton
              classNames={{
                container: "px-0 py-0 border-t-0 hover:bg-transparent",
              }}
            />
          </li>
        </ul>
      </Container>
    </nav>
  );
}
