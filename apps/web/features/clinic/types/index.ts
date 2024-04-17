import type { LucideIcon } from "lucide-react";

export interface LeftBarGroup {
  id: string;
  category?: string;
  items: LeftBarItem[];
}

export interface LeftBarItem {
  icon: LucideIcon;
  text: string;
}
