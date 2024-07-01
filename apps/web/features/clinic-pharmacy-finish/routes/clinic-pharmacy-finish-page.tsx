"use client";

import { ClinicPharmacyFinishPatientProfile } from "../components/patient-profile";
import { ClinicPharmacyPrescriptions } from "../components/prescriptions";

export function ClinicPharmacyFinishPage(): JSX.Element {
  return (
    <div>
      <div className="flex flex-row items-start gap-3">
        <ClinicPharmacyFinishPatientProfile />
        <ClinicPharmacyPrescriptions />
      </div>
    </div>
  );
}
