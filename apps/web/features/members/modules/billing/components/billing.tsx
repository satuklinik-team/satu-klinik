import { Separator } from "@/components/ui/separator";
import { MemberSection } from "@/features/members/components/shared/section";

import { MembersBillingAddress } from "./address";
import { MembersBillingSubscriptions } from "./subscriptions";
import { MembersBillingUpcomingCost } from "./upcoming-cost";

export function MemberBilling(): JSX.Element {
  return (
    <MemberSection className="flex flex-col gap-8">
      <MembersBillingSubscriptions />
      <Separator />
      <MembersBillingUpcomingCost />
      <Separator />
      <MembersBillingAddress />
    </MemberSection>
  );
}
