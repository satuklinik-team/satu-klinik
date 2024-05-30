import { create } from "zustand";

export interface UseClinicLayoutStore {
  isLeftBarOpen: boolean;
  onToggleLeftBar: () => void;
}

export const useClinicLayoutStore = create<UseClinicLayoutStore>((set) => ({
  isLeftBarOpen: false,
  onToggleLeftBar() {
    set(({ isLeftBarOpen }) => ({
      isLeftBarOpen: !isLeftBarOpen,
    }));
  },
}));
