import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = "Loading...", fullScreen = false }: LoadingStateProps) {
  const containerClasses = fullScreen 
    ? "flex h-[80vh] items-center justify-center flex-col gap-3" 
    : "flex py-10 items-center justify-center flex-col gap-3";

  return (
    <div className={containerClasses}>
      <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
      <p className="text-sm font-medium text-zinc-500">{message}</p>
    </div>
  );
}
