import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function MembersBillingSubscriptions(): JSX.Element {
  return (
    <div>
      <h3 className="text-2xl font-medium mb-2">Subscriptions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This is your current billing cycle ( Mar 27 - Apr 26 )
      </p>
      <Card className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row items-center gap-2 py-6 px-7">
        <Image
          alt="Diamond Illustration"
          height={100}
          src="/diamond.png"
          width={100}
        />
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center gap-2">
            <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold">
              Lite Membership
            </p>
            <Badge
              className="text-xs px-2 py-1 cursor-default"
              variant="destructive"
            >
              Expired in 7 Days
            </Badge>
          </div>
          <Progress className="w-full max-w-80" value={75} />
        </div>
        <Button variant="ghost">View Current Subscription Plan</Button>
      </Card>
    </div>
  );
}
