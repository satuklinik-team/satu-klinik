import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MembersBillingUpcomingCost(): JSX.Element {
  return (
    <div>
      <h3 className="text-2xl font-medium mb-2">Billing</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This will be the upcoming cost (excluding credits) for your next invoice
      </p>
      <Card className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row items-center gap-2 py-6 px-7">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-center sm:text-center md:text-center lg:text-start xl:text-start 2xl:text-start font-semibold">
            Rp 100.000,-
          </p>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center gap-2 ">
            <Badge className="text-xs px-2 py-1 bg-green-500 hover:bg-green-500/90 cursor-default">
              Paid
            </Badge>
            <p className="text-sm text-muted-foreground hidden sm:inline md:inline lg:inline xl:inline 2xl:inline">
              -
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Due Date: Fri, Apr 26 2024, 16:32:48 WIB
            </p>
          </div>
        </div>
        <Button variant="ghost">Change Subscription Plan</Button>
      </Card>
    </div>
  );
}
