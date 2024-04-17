import {
  Bolt,
  CircleDollarSign,
  File,
  GanttChart,
  Home,
  Settings,
  User,
  UserRound,
} from "lucide-react";

import type { LeftBarGroup } from "../types";

export const leftBarGroups: LeftBarGroup[] = [
  {
    id: "1",
    items: [
      { icon: Home, text: "Dashboard" },
      { icon: UserRound, text: "Pendaftaran Pasien" },
    ],
  },
  {
    id: "2",
    category: "Klinik",
    items: [
      { icon: UserRound, text: "Dokter" },
      { icon: Bolt, text: "Pasien" },
    ],
  },
  {
    id: "3",
    category: "Apotek",
    items: [{ icon: CircleDollarSign, text: "Tebus Obat" }],
  },
  {
    id: "4",
    category: "Rekam Medis",
    items: [{ icon: File, text: "Laporan" }],
  },
  {
    id: "5",
    category: "Aktifitas",
    items: [{ icon: GanttChart, text: "Aktifitas" }],
  },
  {
    id: "6",
    category: "Pengaturan",
    items: [
      { icon: Settings, text: "Umum" },
      { icon: User, text: "Pengguna" },
    ],
  },
];
