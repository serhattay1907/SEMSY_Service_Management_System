import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const { subtotal, itemCount } = useCart();
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/50">
          {itemCount} {t("items")}
        </span>
        <span className="text-white/70 tabular-nums">
          {formatPrice(subtotal, lang)}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
        <span className="text-sm font-semibold text-white">{t("subtotal")}</span>
        <span className="text-xl font-extrabold text-amber-glow tabular-nums">
          {formatPrice(subtotal, lang)}
        </span>
      </div>
    </div>
  );
}
