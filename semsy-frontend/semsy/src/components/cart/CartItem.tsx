import { useState } from "react";
import { Minus, Plus, Trash2, StickyNote } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem, updateItemNote } = useCart();
  const { lang, t } = useLanguage();
  const [noteOpen, setNoteOpen] = useState(!!item.itemNote);

  const name = lang === "tr" ? item.product.name : item.product.nameEn;
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="glass rounded-2xl p-3 animate-fade-slide-up">
      <div className="flex gap-3">
        <img
          src={item.product.imageUrl}
          alt={name}
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold leading-tight text-white">
              {name}
            </h4>
            <button
              type="button"
              onClick={() => removeItem(item.product.id)}
              aria-label={`${t("remove")} ${name}`}
              className="rounded-lg p-1 text-white/30 hover:bg-rose-accent/10 hover:text-rose-accent"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-0.5 text-xs text-white/40 tabular-nums">
            {formatPrice(item.product.price, lang)} × {item.quantity}
          </p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="glass-strong flex items-center gap-0.5 rounded-full p-0.5">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                aria-label="Decrease quantity"
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-3 w-3" strokeWidth={3} />
              </button>
              <span className="min-w-[1.25rem] text-center text-xs font-bold tabular-nums text-amber-glow">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                disabled={item.quantity >= item.product.stock}
                aria-label="Increase quantity"
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full",
                  "bg-amber text-ink-950 hover:bg-amber-glow",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <Plus className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>

            <span className="text-sm font-extrabold text-white tabular-nums">
              {formatPrice(lineTotal, lang)}
            </span>
          </div>
        </div>
      </div>

      {/* Item note */}
      <div className="mt-2.5">
        <button
          type="button"
          onClick={() => setNoteOpen((p) => !p)}
          aria-expanded={noteOpen}
          className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40 hover:text-amber-glow"
        >
          <StickyNote className="h-3 w-3" />
          {t("itemNote")}
        </button>
        {noteOpen && (
          <input
            type="text"
            value={item.itemNote ?? ""}
            onChange={(e) => updateItemNote(item.product.id, e.target.value)}
            placeholder={t("itemNotePlaceholder")}
            className={cn(
              "mt-1.5 w-full rounded-lg bg-ink-950/50 px-3 py-2",
              "text-xs text-white placeholder:text-white/30",
              "border border-white/[0.06] outline-none",
              "focus:border-amber/40 focus:ring-0"
            )}
          />
        )}
      </div>
    </div>
  );
}
