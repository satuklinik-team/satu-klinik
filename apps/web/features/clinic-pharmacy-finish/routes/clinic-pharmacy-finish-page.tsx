import { ClinicPharmacyFinishPatientProfile } from "../components/patient-profile";
import { ClinicPharmacyFinishPrescriptionsTable } from "../components/prescriptions-table";

export function ClinicPharmacyFinishPage(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold mb-6">
        Prescription
      </h1>

      <div className="flex flex-row items-start gap-3">
        <ClinicPharmacyFinishPatientProfile />
        <ClinicPharmacyFinishPrescriptionsTable />
      </div>
    </div>
  );
}
