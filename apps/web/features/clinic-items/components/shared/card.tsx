import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

type ClinicItemCardProps = HTMLAttributes<HTMLDivElement> &
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
  const { clinicId } = useParams();

  const discountPrice = (price * (100 - discount)) / 100;

  return (
    <Card className={cn("cursor-pointer", className)} {...rest}>
      <img
        alt={title}
        className="w-full h-16 bg-muted-foreground/20 rounded-t-md"
        height={144}
        src={imageUrl}
        width={200}
      />
      <div className="w-full h-36 bg-muted-foreground/20 rounded-t-md" />
      <div className="flex flex-col gap-3 p-4">
        <p className="text-base font-bold">{title}</p>
        <div className="flex flex-row justify-between items-start gap-2">
          <div>
            <p className="text-base font-bold">
              IDR {discountPrice.toLocaleString()}
            </p>
            <p className="text-[10px] font-thin line-through">
              IDR {price.toLocaleString()}
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
              <Link href={`/clinic/${clinicId as string}/items/${id}`}>
                <TooltipTrigger className="h-min p-2">
                  <Edit size={20} />
                </TooltipTrigger>
              </Link>
              <TooltipContent>Edit Item</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="h-min p-2" onClick={onSelectDelete}>
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
