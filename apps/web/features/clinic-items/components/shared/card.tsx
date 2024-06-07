"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { HTMLAttributes } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { MedicineEntity } from "@/services/medicine/types/entity";
import { DEFAULT_MEDICINE_URL } from "@/utils";

type ClinicItemCardProps = Omit<HTMLAttributes<HTMLDivElement>, "id"> &
  MedicineEntity & {
    onSelectDelete: () => void;
  };

export function ClinicItemCard({
  className,
  id,
  discount,
  imageUrl,
  title,
  stock,
  price,
  onSelectDelete,
  ...rest
}: ClinicItemCardProps): JSX.Element {
  const router = useRouter();
  const { clinicId } = useParams();

  const discountPrice = (price * (100 - discount)) / 100;

  return (
    <Card
      className={cn("cursor-pointer", className)}
      onClick={() => {
        router.push(`/clinic/${clinicId as string}/items/${id}`);
      }}
      {...rest}
    >
      <img
        alt={title}
        className="w-full h-36 bg-muted-foreground/20 rounded-t-md"
        height={144}
        src={imageUrl ?? DEFAULT_MEDICINE_URL}
        width={200}
      />
      <div className="flex flex-col gap-3 p-4">
        <p className="text-base font-bold">{title}</p>
        <div className="flex flex-row justify-between items-start gap-2">
          <div>
            <p className="text-base font-bold">
              Rp {discountPrice.toLocaleString()}
            </p>
            <p className="text-[10px] font-thin line-through">
              Rp {price.toLocaleString()}
            </p>
          </div>
          <Badge className="text-xs px-2" variant="destructive">
            {discount}% off
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">Stock: {stock}</p>
        <div className="flex flex-row items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <Link
                href={`/clinic/${clinicId as string}/items/${id}/edit`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <TooltipTrigger className="h-min p-2">
                  <Edit size={20} />
                </TooltipTrigger>
              </Link>
              <TooltipContent>Edit Item</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className="h-min p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDelete();
                }}
              >
                <Trash className="text-red-500" size={20} />
              </TooltipTrigger>
              <TooltipContent>Hapus Item</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
