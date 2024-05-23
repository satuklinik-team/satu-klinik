import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicCard } from "@/features/clinic/components/ui/card";

import { ClinicDiagnosePatientForm } from "../components/form";
import { ClinicDiagnoseHistory } from "../components/history";
import { ClinicDiagnosePatientProfile } from "../components/patient-profile";

export function ClinicDiagnosePatientPage(): JSX.Element {
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold">
          Diagnose Patient
        </h1>
        <p className="text-muted-foreground">Diagnose the current patient</p>
      </div>
      <ClinicDiagnosePatientProfile />
      <ClinicCard className="mt-6">
        <Tabs defaultValue="soap">
          <TabsList className="flex flex-row justify-start gap-1 mb-4">
            <TabsTrigger value="soap">SOAP</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="soap">
            <ClinicDiagnosePatientForm />
            <ClinicDiagnoseHistory />
          </TabsContent>
        </Tabs>
      </ClinicCard>
    </div>
  );
}
