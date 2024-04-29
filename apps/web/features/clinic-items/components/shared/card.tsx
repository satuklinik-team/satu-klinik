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
import type { ItemEntity } from "@/services/item/types/entity";

type ClinicItemCardProps = HTMLAttributes<HTMLDivElement> & ItemEntity;

export function ClinicItemCard({
  className,
  id,
  title,
  quantity,
  ...rest
}: ClinicItemCardProps): JSX.Element {
  const { clinicId } = useParams();

  return (
    <Card className={cn("cursor-pointer", className)} {...rest}>
      <div className="w-full h-36 bg-muted-foreground/20 rounded-t-md" />
      <div className="flex flex-col gap-3 p-4">
        <p className="text-base font-bold">{title}</p>
        <div className="flex flex-row justify-between items-start gap-2">
          <div>
            <p className="text-base font-bold">IDR 50.000</p>
            <p className="text-[10px] font-thin line-through">IDR 100.000</p>
          </div>
          <Badge className="text-xs px-2" variant="destructive">
            50% off
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">Stock: {quantity}</p>
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
              <TooltipTrigger className="h-min p-2">
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
