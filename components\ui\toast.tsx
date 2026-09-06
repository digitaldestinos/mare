import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Toast({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="status" className={cn("flex items-start gap-3 rounded-lg border bg-card p-4 text-sm text-card-foreground shadow-soft", className)} {...props} />;
}

