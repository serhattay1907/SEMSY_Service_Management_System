import { useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, getQuantity } = useCart();
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [bumping, setBumping] = useState(false);

  const quantity = getQuantity(product.id);
  const isOut = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 8;

  const name = lang === "tr" ? product.name : product.nameEn;
  const description =
    lang === "tr" ? product.description : product.descriptionEn;

  const handleAdd = () => {
    if (isOut) return;
    addItem(product);
    setBumping(true);
    window.setTimeout(() => setBumping(false), 320);
  };

  const handleDec = () => {
    updateQuantity(product.id, quantity - 1);
  };
  const handleInc = () => {
    if (quantity >= product.stock) return;
    updateQuantity(product.id, quantity + 1);
    setBumping(true);
    window.setTimeout(() => setBumping(false), 320);
  };

  return (
    <article
      className={cn(
        "glass relative flex gap-4 rounded-2xl p-3.5",
        "transition-all duration-300",
        isOut && "opacity-60",
        quantity > 0 &&
          !isOut &&
          "ring-1 ring-amber/30 shadow-amber-glow bg-white/[0.06]"
      )}
    >
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-800">
        <img
          src={product.imageUrl}
          alt={name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            !isOut && "group-hover:scale-105",
            isOut && "grayscale"
          )}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {isOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/60 backdrop-blur-sm">
            <span className="rounded-md bg-ink-950/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-accent">
              {t("outOfStock")}
            </span>
          </div>
        )}
        {isLowStock && !isOut && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 rounded-md bg-ink-950/85 px-1.5 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wider text-amber-glow">
            {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-tight tracking-tight text-white">
            {name}
          </h3>
          <span className="shrink-0 text-base font-extrabold text-amber-glow tabular-nums">
            {formatPrice(product.price, lang)}
          </span>
        </div>

        <p
          className={cn(
            "mt-1 text-xs leading-relaxed text-white/50",
            !expanded && "line-clamp-2"
          )}
        >
          {description}
        </p>
        {description.length > 70 && (
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-0.5 flex items-center gap-0.5 self-start text-[10px] font-semibold uppercase tracking-wider text-white/40 hover:text-amber-glow"
            aria-expanded={expanded}
          >
            {expanded ? t("viewLess") : t("viewMore")}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        )}

        <div className="mt-auto flex items-center justify-end pt-2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={isOut}
              aria-label={`${t("addToCart")} — ${name}`}
              className={cn(
                "btn-amber flex items-center gap-1.5 rounded-full",
                "h-9 px-4 text-xs tap-target",
                "min-h-0"
              )}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              {t("addToCart")}
            </button>
          ) : (
            <div
              className={cn(
                "glass-strong flex items-center gap-1 rounded-full p-1",
                bumping && "animate-micro-bounce"
              )}
            >
              <button
                type="button"
                onClick={handleDec}
                aria-label={`Decrease ${name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={3} />
              </button>
              <span className="min-w-[1.5rem] text-center text-sm font-bold tabular-nums text-amber-glow">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleInc}
                disabled={quantity >= product.stock}
                aria-label={`Increase ${name}`}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  "bg-amber text-ink-950 hover:bg-amber-glow",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
