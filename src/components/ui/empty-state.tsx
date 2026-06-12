import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
      <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-zinc-400" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
