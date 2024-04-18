"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicCard } from "@/features/clinic/components/ui/card";

export function ClinicGeneralSettingsPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Configure system parameters</p>
      </div>

      <ClinicCard
        borderPosition="left"
        className="border-sky-500 mb-4"
        classNames={{
          content: "pt-0",
        }}
        title={<p className="text-lg font-semibold">Welcome, Nona Perma</p>}
      >
        <p className="text-sm font-normal">Manage your application.</p>
      </ClinicCard>

      <ClinicCard title="General">
        <Tabs defaultValue="general">
          <TabsList className="flex flex-row justify-start gap-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>
          <TabsContent value="general"></TabsContent>
          <TabsContent
            className="flex flex-col gap-4 px-4 py-2"
            value="department"
          >
            <p className="text-base font-semibold">
              Department(s) queue counter status:
            </p>
            <ul>
              <li className="text-base font-normal">main : 0</li>
            </ul>
            <Button className="bg-orange-500 hover:bg-orange-500">
              Atur Ulang
            </Button>
          </TabsContent>
          <TabsContent value="integration"></TabsContent>
        </Tabs>
      </ClinicCard>
    </div>
  );
}