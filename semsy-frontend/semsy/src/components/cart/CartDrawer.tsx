import { useEffect } from "react";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onPlaceOrder: () => void;
}

export function CartDrawer({ open, onClose, onPlaceOrder }: CartDrawerProps) {
  const { cart, updateNote, itemCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const isEmpty = itemCount === 0;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={t("cart")}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-slide-up"
        style={{ animationDuration: "200ms" }}
      />

      {/* Sheet (mobile) / drawer (desktop) */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0",
          "md:top-0 md:left-auto md:right-0 md:bottom-0 md:w-[440px]",
          "flex flex-col",
          "rounded-t-3xl md:rounded-t-none md:rounded-l-3xl",
          "bg-ink-900/95 backdrop-blur-glass-strong",
          "border-t md:border-t-0 md:border-l border-white/[0.08]",
          "shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.6)]",
          "max-h-[92vh] md:max-h-none",
          "animate-sheet-up md:animate-fade-slide-up"
        )}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="h-1 w-10 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/10 ring-1 ring-amber/20">
              <ShoppingBag className="h-4 w-4 text-amber-glow" />
            </div>
            <div className="leading-tight">
              <h2 className="text-base font-bold text-white">{t("cart")}</h2>
              {!isEmpty && (
                <p className="text-[11px] text-white/40">
                  {itemCount} {t("items")}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white/50 hover:bg-white/5 hover:text-white tap-target"
          >
            <X className="" size={18} />
          </button>
        </div>

        {/* Body */}
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-16 text-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl glass">
                <ShoppingBag className="h-9 w-9 text-white/30" />
              </div>
              <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-glow opacity-60" />
            </div>
            <div>
              <p className="text-base font-bold text-white">{t("emptyCart")}</p>
              <p className="mt-1 text-sm text-white/40">{t("emptyCartDesc")}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5">
              {cart.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}

              {/* Order note */}
              <div className="pt-2">
                <label
                  htmlFor="order-note"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-white/50"
                >
                  {t("orderNote")}
                </label>
                <textarea
                  id="order-note"
                  value={cart.orderNote}
                  onChange={(e) => updateNote(e.target.value)}
                  placeholder={t("orderNotePlaceholder")}
                  rows={2}
                  className={cn(
                    "w-full resize-none rounded-xl bg-ink-950/60 px-3 py-2.5",
                    "text-sm text-white placeholder:text-white/30",
                    "border border-white/[0.06] outline-none",
                    "focus:border-amber/40 focus:ring-0"
                  )}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] bg-ink-950/40 px-5 py-4 space-y-3 safe-bottom">
              <CartSummary />
              <Button
                variant="amber"
                size="lg"
                fullWidth
                onClick={onPlaceOrder}
              >
                {t("placeOrder")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
