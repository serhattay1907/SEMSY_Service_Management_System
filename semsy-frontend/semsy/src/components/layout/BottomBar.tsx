import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, formatPrice } from "@/lib/utils";

interface BottomBarProps {
  onOpenCart: () => void;
}

export function BottomBar({ onOpenCart }: BottomBarProps) {
  const { itemCount, subtotal } = useCart();
  const { lang, t } = useLanguage();

  if (itemCount === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 safe-bottom",
        "px-3 pb-3 pt-2",
        "animate-fade-slide-up"
      )}
      style={{
        background:
          "linear-gradient(to top, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0))",
      }}
    >
      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`${t("cart")}: ${itemCount} ${t("items")}`}
        className={cn(
          "mx-auto flex w-full max-w-3xl items-center justify-between",
          "rounded-2xl px-4 py-3.5",
          "btn-amber tap-target",
          "group"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-black/15">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.4} />
            <span
              className={cn(
                "absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center",
                "rounded-full bg-ink-950 px-1 text-[11px] font-bold text-amber-glow",
                "ring-2 ring-amber"
              )}
            >
              {itemCount}
            </span>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-xs font-medium opacity-80">
              {itemCount} {t("items")}
            </span>
            <span className="text-base font-extrabold tracking-tight">
              {formatPrice(subtotal, lang)}
            </span>
          </div>
        </div>
        <span className="rounded-xl bg-black/15 px-4 py-2 text-sm font-bold tracking-tight">
          {t("cart")} →
        </span>
      </button>
    </div>
  );
}
