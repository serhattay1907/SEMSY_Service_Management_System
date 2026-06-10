import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === "default" ? "glass" : "glass-strong",
          "rounded-2xl",
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";
