"use client";

import { StarIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ClinicItemDetailPage(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname.replace("/itemId", "")}>
              Data Inventori
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={pathname}>Nama Item</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-start sm:items-start md:items-center lg:items-center xl:items-center 2xl:items-center gap-4">
        <div className="bg-border w-full sm:w-full md:w-96 lg:w-96 xl:w-96 2xl:w-96 h-96 rounded-xl" />
        <div className="flex flex-col gap-2 w-full sm:w-full md:w-fit lg:w-fit xl:w-fit 2xl:w-fit">
          <p className="text-2xl font-semibold capitalize">Amoxcylin</p>
          <p className="font-light text-sm">amount of fee</p>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }).map((_item, index) => (
                <StarIcon
                  className="text-orange-500 cursor-pointer"
                  key={index}
                  size={18}
                />
              ))}
            </div>
            <span className="text-[13px] font-normal">
              5 | 213 Reviews | 1,000+ orders
            </span>
          </div>
          <Separator className="w-full sm:w-full md:w-96 lg:w-96 xl:w-96 2xl:w-96" />
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl font-bold">IDR 50.000</p>
            <p className="text-[10px] font-thin line-through">IDR 100.000</p>
            <Badge className="text-xs" variant="destructive">
              50% off
            </Badge>
          </div>
          <p className="text-primary text-xs font-semibold">Free Shipping</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
