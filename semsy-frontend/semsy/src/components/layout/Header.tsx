import { Languages, Coffee } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface HeaderProps {
  tableNumber: number | null;
}

export function Header({ tableNumber }: HeaderProps) {
  const { lang, toggle, t } = useLanguage();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full safe-top",
        "border-b border-white/[0.06]",
        "bg-ink-950/70 backdrop-blur-glass-strong backdrop-saturate-150"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber to-amber-deep shadow-amber-glow">
              <Coffee
                className="text-ink-950"
                strokeWidth={2.5}
                size={18}
              />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-white">
              {t("appName")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
              Order · Sipariş
            </span>
          </div>
        </div>

        {/* Table badge */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "glass flex items-center gap-1.5 rounded-full px-3 py-1.5",
              "text-xs font-semibold",
              tableNumber !== null
                ? "text-amber-glow"
                : "text-teal-accent"
            )}
            aria-label={
              tableNumber !== null
                ? `${t("table")} ${tableNumber}`
                : t("takeaway")
            }
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full animate-pulse-soft",
                tableNumber !== null ? "bg-amber-glow" : "bg-teal-accent"
              )}
            />
            {tableNumber !== null
              ? `${t("table")} ${tableNumber}`
              : t("takeaway")}
          </div>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className={cn(
              "glass flex items-center gap-1.5 rounded-full px-3 py-1.5",
              "text-xs font-bold uppercase tracking-wider",
              "hover:bg-white/[0.08] transition-colors tap-target",
              "min-h-0"
            )}
          >
            <Languages className="h-3.5 w-3.5 text-white/60" />
            <span className="flex items-center gap-1">
              <span
                className={cn(
                  "transition-colors",
                  lang === "tr" ? "text-amber-glow" : "text-white/30"
                )}
              >
                TR
              </span>
              <span className="text-white/20">|</span>
              <span
                className={cn(
                  "transition-colors",
                  lang === "en" ? "text-amber-glow" : "text-white/30"
                )}
              >
                EN
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
