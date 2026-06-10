import {
  ClipboardCheck,
  ChefHat,
  BellRing,
  CreditCard,
  Check,
} from "lucide-react";
import type { OrderStatus } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { StringKey } from "@/i18n/strings";
import type { LucideIcon } from "lucide-react";

interface OrderStatusSteperProps {
  status: OrderStatus;
}

interface Step {
  key: OrderStatus;
  label: StringKey;
  desc: StringKey;
  icon: LucideIcon;
}

const steps: Step[] = [
  { key: "pending", label: "received", desc: "receivedDesc", icon: ClipboardCheck },
  { key: "preparing", label: "preparing", desc: "preparingDesc", icon: ChefHat },
  { key: "ready", label: "ready", desc: "readyDesc", icon: BellRing },
  { key: "paid", label: "completed", desc: "completedDesc", icon: CreditCard },
];

const order: Record<OrderStatus, number> = {
  pending: 0,
  preparing: 1,
  ready: 2,
  paid: 3,
};

export function OrderStatusStepper({ status }: OrderStatusSteperProps) {
  const { t } = useLanguage();
  const activeIdx = order[status];

  return (
    <ol className="space-y-3">
      {steps.map((step, idx) => {
        const isCompleted = idx < activeIdx;
        const isActive = idx === activeIdx;
        const isPending = idx > activeIdx;
        const Icon = step.icon;

        return (
          <li
            key={step.key}
            className={cn(
              "relative flex gap-4 rounded-2xl p-4 transition-all duration-500",
              isActive && "glass-strong shadow-amber-glow",
              isCompleted && "opacity-80",
              isPending && "opacity-40"
            )}
          >
            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-9 top-[3.75rem] h-3 w-px",
                  isCompleted ? "bg-amber/40" : "bg-white/10"
                )}
                aria-hidden
              />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
                isCompleted &&
                  "bg-amber/15 text-amber-glow ring-1 ring-amber/30",
                isActive &&
                  "bg-gradient-to-br from-amber to-amber-deep text-ink-950 shadow-amber-glow",
                isPending && "bg-white/[0.04] text-white/40"
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : (
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              )}
              {isActive && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-amber/30 animate-pulse-soft" />
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center leading-tight">
              <p
                className={cn(
                  "text-sm font-bold",
                  isActive ? "text-amber-glow" : "text-white"
                )}
              >
                {t(step.label)}
              </p>
              <p className="mt-0.5 text-xs text-white/50">{t(step.desc)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
