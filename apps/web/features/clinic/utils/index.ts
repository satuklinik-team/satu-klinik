import {
  Activity,
  Bookmark,
  Boxes,
  CirclePlus,
  Home,
  Pill,
  Settings,
  Stethoscope,
  Store,
  User,
  Users,
} from "lucide-react";

import type { LeftBarGroup, LeftBarItem } from "../types";

export const leftBarGroups: LeftBarGroup[] = [
  {
    id: "1",
    items: [
      { id: "dashboard", icon: Home, text: "Dashboard", path: "/" },
      {
        id: "patient-registration",
        icon: CirclePlus,
        text: "Pendaftaran Pasien",
        path: "/mr/register",
      },
    ],
  },
  {
    id: "2",
    category: "Klinik",
    items: [
      { id: "doctor-menu", icon: Stethoscope, text: "Dokter", path: "/doctor" },
      { id: "patient-menu", icon: User, text: "Pasien", path: "/patient" },
    ],
  },
  {
    id: "3",
    category: "Apotek",
    items: [
      { id: "pharmacy-task", icon: Store, text: "Tugas", path: "/pharmacy" },
      {
        id: "pharmacy-categories",
        icon: Boxes,
        text: "Kategori",
        path: "/categories",
      },
      {
        id: "pharmacy-inventory",
        icon: Pill,
        text: "Inventori",
        path: "/items",
      },
    ],
  },
  {
    id: "4",
    category: "Rekam Medis",
    items: [
      { id: "report", icon: Bookmark, text: "Laporan", path: "/mr/report" },
    ],
  },
  {
    id: "5",
    category: "Aktifitas",
    items: [
      { id: "activity", icon: Activity, text: "Aktifitas", path: "/activity" },
    ],
  },
  {
    id: "6",
    category: "Pengaturan",
    items: [
      {
        id: "settings-general",
        icon: Settings,
        text: "Umum",
        path: "/setting",
      },
      { id: "settings-user", icon: Users, text: "Pengguna", path: "/users" },
    ],
  },
];

export const clinicDashboardServices: LeftBarItem[] = [
  {
    id: "services-patient",
    icon: CirclePlus,
    text: "Pendaftaran Pasien",
    path: "/patient",
  },
  {
    id: "services-pharmacy",
    icon: Store,
    text: "Apotek - Tugas",
    path: "/pharmacy",
  },
];
