import type { LucideIcon } from "lucide-react";

export interface LeftBarGroup {
  id: string;
  category?: string;
  items: LeftBarItem[];
}

export interface LeftBarItem {
  id: string;
  icon: LucideIcon;
  text: string;
  path: string;
}
