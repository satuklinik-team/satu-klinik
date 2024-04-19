"use client";

import Link from "next/link";

import { Container } from "../shared/container";

export function MembersFooter(): JSX.Element {
  return (
    <div className="w-screen">
      <Container className="h-11">
        <ul className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center items-center gap-8">
          <li className="text-muted-foreground text-center text-sm">
            Copyright © CV. Satuklinik Global {new Date().getFullYear()}
          </li>

          <li className="text-muted-foreground text-center text-sm">
            <Link href="">Terms & Conditions</Link>
          </li>

          <li className="text-muted-foreground text-center text-sm">
            <Link href="">Privacy Policy</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}
