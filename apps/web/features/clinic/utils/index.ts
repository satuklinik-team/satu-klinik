import {
  Activity,
  Bookmark,
  CirclePlus,
  Home,
  Settings,
  Stethoscope,
  Store,
  User,
  Users,
} from "lucide-react";

import type { LeftBarGroup } from "../types";

export const leftBarGroups: LeftBarGroup[] = [
  {
    id: "1",
    items: [
      { icon: Home, text: "Dashboard", path: "/" },
      { icon: CirclePlus, text: "Pendaftaran Pasien", path: "/mr/register" },
    ],
  },
  {
    id: "2",
    category: "Klinik",
    items: [
      { icon: Stethoscope, text: "Dokter", path: "/doctor" },
      { icon: User, text: "Pasien", path: "/patient" },
    ],
  },
  {
    id: "3",
    category: "Apotek",
    items: [{ icon: Store, text: "Tugas", path: "/pharmacy" }],
  },
  {
    id: "4",
    category: "Rekam Medis",
    items: [{ icon: Bookmark, text: "Laporan", path: "/mr/report" }],
  },
  {
    id: "5",
    category: "Aktifitas",
    items: [{ icon: Activity, text: "Aktifitas", path: "/activity" }],
  },
  {
    id: "6",
    category: "Pengaturan",
    items: [
      { icon: Settings, text: "Umum", path: "/setting" },
      { icon: Users, text: "Pengguna", path: "/users" },
    ],
  },
];
