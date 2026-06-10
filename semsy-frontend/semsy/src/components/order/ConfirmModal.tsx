import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

interface ConfirmModalProps {
  open: boolean;
  loading: boolean;
  tableNumber: number | null;
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmModal({
  open,
  loading,
  tableNumber,
  onConfirm,
  onBack,
}: ConfirmModalProps) {
  const { cart, subtotal, itemCount } = useCart();
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, loading, onBack]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={loading ? undefined : onBack}
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <div
        className={cn(
          "relative w-full max-w-md",
          "rounded-3xl bg-ink-900/95 backdrop-blur-glass-strong",
          "border border-white/[0.1]",
          "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]",
          "animate-scale-fade-in"
        )}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/10 ring-1 ring-amber/20">
            <Check className="h-5 w-5 text-amber-glow" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {t("confirmTitle")}
          </h2>
          <p className="mt-1 text-sm text-white/50">{t("confirmDesc")}</p>
        </div>

        {/* Summary */}
        <div className="mx-6 my-4 space-y-3 rounded-2xl bg-ink-950/60 p-4 border border-white/[0.04]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">
              {tableNumber !== null ? t("table") : t("takeaway")}
            </span>
            <span className="font-semibold text-amber-glow">
              {tableNumber !== null ? `${t("table")} ${tableNumber}` : "—"}
            </span>
          </div>
          <div className="space-y-1.5 border-t border-white/[0.06] pt-3 max-h-40 overflow-y-auto">
            {cart.items.map((item) => {
              const name =
                lang === "tr" ? item.product.name : item.product.nameEn;
              return (
                <div
                  key={item.product.id}
                  className="flex items-start justify-between gap-3 text-xs"
                >
                  <span className="flex-1 text-white/70">
                    <span className="font-bold text-amber-glow">
                      {item.quantity}×
                    </span>{" "}
                    {name}
                  </span>
                  <span className="text-white/60 tabular-nums">
                    {formatPrice(item.product.price * item.quantity, lang)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="text-sm font-semibold text-white">
              {t("subtotal")} ({itemCount})
            </span>
            <span className="text-lg font-extrabold text-amber-glow tabular-nums">
              {formatPrice(subtotal, lang)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-6 pb-6 pt-2">
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            disabled={loading}
            className="flex-1"
          >
            {t("back")}
          </Button>
          <Button
            variant="amber"
            size="lg"
            onClick={onConfirm}
            disabled={loading}
            className="flex-[1.5]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("placingOrder")}
              </>
            ) : (
              t("confirm")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
