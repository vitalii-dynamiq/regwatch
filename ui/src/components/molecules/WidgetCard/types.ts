import type { LucideIcon } from 'lucide-react';

export interface WidgetCardProps {
  children: React.ReactNode;
  icon: LucideIcon;
  title: string;
  className?: string;
  href?: string;
}
