import { PlusCircleIcon, StoreIcon } from "lucide-react";

import type { ClinicDashboardService } from "../types";

export const clinicDashboardServices: ClinicDashboardService[] = [
  {
    icon: PlusCircleIcon,
    text: "Pendaftaran Pasien",
    path: "/patient",
  },
  {
    icon: StoreIcon,
    text: "Apotek - Tugas",
    path: "/pharmacy",
  },
];
