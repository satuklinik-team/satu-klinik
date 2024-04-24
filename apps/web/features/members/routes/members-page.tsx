import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MemberSection } from "../components/shared/section";
import { MemberBilling } from "../modules/billing/components/billing";
import { MembersTeamsTable } from "../modules/team/components/table";

export function MembersPage(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold ml-2 my-2">
        Account
      </h1>
      <p className="text-muted-foreground ml-2 mb-4">
        manage your account and business setting
      </p>

      <Tabs defaultValue="team">
        <TabsList className="flex flex-row justify-start gap-1 mb-4">
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <MembersTeamsTable />
        </TabsContent>
        <TabsContent value="billing">
          <MemberBilling />
        </TabsContent>
        <TabsContent value="invoices">
          <MemberSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
