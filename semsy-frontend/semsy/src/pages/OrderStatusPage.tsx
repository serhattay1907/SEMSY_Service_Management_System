import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { OrderStatusStepper } from "@/components/order/OrderStatus";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import type { OrderStatus } from "@/types";
import { formatPrice, cn } from "@/lib/utils";

const STATUS_FLOW: OrderStatus[] = ["pending", "preparing", "ready", "paid"];
const ADVANCE_INTERVAL = 8000;

export function OrderStatusPage() {
  const { lastOrder } = useCart();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [status, setStatus] = useState<OrderStatus>(
    lastOrder?.status ?? "pending"
  );

  // Auto-advance status every 8s
  useEffect(() => {
    if (!lastOrder) return;
    const currentIdx = STATUS_FLOW.indexOf(status);
    if (currentIdx >= STATUS_FLOW.length - 1) return;

    const timer = window.setTimeout(() => {
      const nextStatus = STATUS_FLOW[currentIdx + 1];
      if (nextStatus) setStatus(nextStatus);
    }, ADVANCE_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [status, lastOrder]);

  if (!lastOrder) {
    return (
      <div className="min-h-screen">
        <Header tableNumber={null} />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-white/60">No active order.</p>
          <Button
            variant="amber"
            size="lg"
            onClick={() => navigate("/")}
            className="mt-4"
          >
            {t("backToMenu")}
          </Button>
        </main>
      </div>
    );
  }

  const placedAt = new Date(lastOrder.createdAt);
  const timeString = placedAt.toLocaleTimeString(
    lang === "tr" ? "tr-TR" : "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <div className="min-h-screen pb-8">
      <Header tableNumber={lastOrder.tableNumber} />

      <main className="mx-auto max-w-3xl px-4 py-5 space-y-5">
        {/* Title */}
        <div className="animate-fade-slide-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            {t("orderStatus")}
          </p>
          <div className="mt-1 flex items-baseline gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-gradient-amber tabular-nums">
              {lastOrder.orderNumber}
            </h1>
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Clock className="h-3 w-3" />
              {t("placedAt")} {timeString}
            </span>
          </div>
        </div>

        {/* Status stepper */}
        <GlassCard className="p-3 animate-fade-slide-up" variant="default">
          <OrderStatusStepper status={status} />
        </GlassCard>

        {/* Order details */}
        <GlassCard className="p-5 animate-fade-slide-up" variant="default">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            {t("orderItems")}
          </h2>
          <ul className="space-y-2.5">
            {lastOrder.items.map((item) => {
              const name =
                lang === "tr" ? item.product.name : item.product.nameEn;
              return (
                <li
                  key={item.product.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="flex flex-1 items-start gap-3">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                        "bg-amber/10 text-[11px] font-bold text-amber-glow tabular-nums"
                      )}
                    >
                      {item.quantity}
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-white">
                        {name}
                      </p>
                      {item.itemNote && (
                        <p className="mt-0.5 text-[11px] italic text-white/40">
                          — {item.itemNote}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {formatPrice(item.product.price * item.quantity, lang)}
                  </span>
                </li>
              );
            })}
          </ul>

          {lastOrder.orderNote && (
            <div className="mt-4 rounded-xl bg-ink-950/50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                {t("orderNote")}
              </p>
              <p className="mt-1 text-xs italic text-white/70">
                {lastOrder.orderNote}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
            <span className="text-sm font-semibold text-white">
              {t("subtotal")}
            </span>
            <span className="text-xl font-extrabold text-amber-glow tabular-nums">
              {formatPrice(lastOrder.total, lang)}
            </span>
          </div>
        </GlassCard>

        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToMenu")}
        </Button>
      </main>
    </div>
  );
}
