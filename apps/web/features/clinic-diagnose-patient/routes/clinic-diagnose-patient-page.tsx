import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicCard } from "@/features/clinic/components/ui/card";

import { ClinicDiagnosePatientForm } from "../components/form";
import { ClinicDiagnoseHistory } from "../components/history";
import { ClinicDiagnosePatientProfile } from "../components/patient-profile";

export function ClinicDiagnosePatientPage(): JSX.Element {
  return (
    <div className="h-full">
      <ClinicDiagnosePatientProfile />
      <ClinicCard className="mt-6">
        <Tabs defaultValue="soap">
          <TabsList className="flex flex-row justify-start gap-1 mb-4">
            <TabsTrigger value="soap">SOAP</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent
            className="data-[state=inactive]:hidden"
            forceMount
            value="soap"
          >
            <ClinicDiagnosePatientForm />
          </TabsContent>
          <TabsContent
            className="data-[state=inactive]:hidden"
            forceMount
            value="history"
          >
            <ClinicDiagnoseHistory />
          </TabsContent>
        </Tabs>
      </ClinicCard>
    </div>
  );
}
