"use client";

import { BadgeCheck, TriangleAlert } from "lucide-react";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicCard } from "@/features/clinic/components/ui/card";
import { useGetClinic } from "@/services/clinic/hooks/use-get-clinic";
import type { RouteParams } from "@/types";

import { SettingGeneralForm } from "../components/general-form";

export function ClinicGeneralSettingsPage(): JSX.Element {
  const { clinicId } = useParams<RouteParams>();
  const { data: clinicData } = useGetClinic(clinicId);

  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Settings
        </h1>
        <p className="text-muted-foreground">Configure system parameters</p>
      </div>

      {Boolean(clinicData?.completeCreds) && (
        <div className="bg-green-100 border border-green-500 rounded-md p-4 mb-4 flex gap-2">
          <BadgeCheck className="text-green-800" />
          <h2 className="text-green-800 font-semibold">
            Klinik sudah terintegrasi dengan SatuSehat
          </h2>
        </div>
      )}

      {Boolean(!clinicData?.completeCreds) && (
        <div className="bg-yellow-100 border border-yellow-500 rounded-md p-4 mb-4 flex gap-2">
          <TriangleAlert className="text-yellow-800" />
          <div className="flex flex-col">
            <h2 className="text-yellow-800 font-semibold">
              Klinik belum terintegrasi dengan SatuSehat
            </h2>
            <p className="text-sm">Silahkan hubungi admin SatuKlinik</p>
          </div>
        </div>
      )}

      <ClinicCard title="General">
        <Tabs defaultValue="general">
          <TabsList className="flex flex-row justify-start gap-1">
            <TabsTrigger value="general">General</TabsTrigger>
            {/* <TabsTrigger value="department">Department</TabsTrigger> */}
            {/* <TabsTrigger value="integration">Integration</TabsTrigger> */}
          </TabsList>
          <TabsContent value="general">
            <SettingGeneralForm />
          </TabsContent>
          {/* <TabsContent
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
          </TabsContent> */}
          {/* <TabsContent value="integration">
            <IntegrationForm />
          </TabsContent> */}
        </Tabs>
      </ClinicCard>
    </div>
  );
}
