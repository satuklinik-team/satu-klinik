import lodash from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface UseDiagnosePatientStoreState {
  diagnoses: Partial<Record<string, Record<string, object>>>;
  setDiagnose: (
    { mrId, patientId }: { patientId: string; mrId: string },
    data: object
  ) => unknown;
  getDiagnose: ({
    mrId,
    patientId,
  }: {
    patientId: string;
    mrId: string;
  }) => unknown;
  removeDiagnose: ({
    mrId,
    patientId,
  }: {
    patientId: string;
    mrId: string;
  }) => unknown;
}

export const useDiagnosePatientStore = create(
  persist(
    immer<UseDiagnosePatientStoreState>((set, get) => ({
      diagnoses: {},
      setDiagnose({ mrId, patientId }, data) {
        set((state) => {
          if (!lodash.get(state.diagnoses, patientId)) {
            state.diagnoses[patientId] = {};
          }

          state.diagnoses = lodash.set(
            state.diagnoses,
            `${patientId}.${mrId}`,
            data
          );
        });
      },
      getDiagnose({ mrId, patientId }) {
        const diagnose = lodash.get(get().diagnoses, `${patientId}.${mrId}`);

        return {
          ...(diagnose ?? {}),
          mrid: mrId,
          prescriptions: diagnose?.prescriptions ?? [],
        };
      },
      removeDiagnose({ mrId, patientId }) {
        set((state) => {
          state.diagnoses = lodash.set(
            state.diagnoses,
            `${patientId}.${mrId}`,
            undefined
          );
        });
      },
    })),
    { name: "diagnose-patient-store" }
  )
);
