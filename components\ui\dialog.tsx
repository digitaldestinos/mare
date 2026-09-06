import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Dialog = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div role="dialog" aria-modal="true" className={cn("fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4", className)} {...props} />;
export const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("w-full max-w-lg rounded-lg border bg-card p-6 shadow-soft", className)} {...props} />);
DialogContent.displayName = "DialogContent";
export const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("mb-5 space-y-1", className)} {...props} />;

