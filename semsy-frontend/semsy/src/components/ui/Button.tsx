import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "amber" | "ghost" | "glass" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  amber: "btn-amber",
  ghost:
    "bg-transparent text-white/80 hover:bg-white/5 active:bg-white/10 border border-white/10",
  glass:
    "glass text-white hover:bg-white/[0.07] active:bg-white/[0.1] transition-colors",
  danger:
    "bg-rose-accent/10 text-rose-accent hover:bg-rose-accent/20 border border-rose-accent/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl tap-target",
  lg: "h-14 px-6 text-base rounded-2xl tap-target font-semibold",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "glass", size = "md", fullWidth, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-all duration-200 ease-out",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
