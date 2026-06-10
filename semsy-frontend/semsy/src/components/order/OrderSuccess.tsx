import { useEffect, useMemo } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Order } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OrderSuccessProps {
  order: Order;
  onTrack: () => void;
}

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: string;
}

export function OrderSuccess({ order, onTrack }: OrderSuccessProps) {
  const { t } = useLanguage();

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 4 + Math.random() * 6,
        hue: ["#f59e0b", "#fbbf24", "#fde68a", "#2dd4bf"][i % 4]!,
      })),
    []
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-ink-950/95 backdrop-blur-xl px-4">
      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute -top-4 rounded-full opacity-80"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.hue,
              boxShadow: `0 0 12px ${p.hue}`,
              animation: `fall ${p.duration}s ${p.delay}s linear forwards`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center animate-scale-fade-in">
        {/* Big check */}
        <div className="relative mb-7">
          <div
            className="absolute inset-0 rounded-full bg-amber/20"
            style={{ animation: "ringPulse 2s ease-in-out infinite" }}
          />
          <div
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-full",
              "bg-gradient-to-br from-amber to-amber-deep",
              "shadow-amber-glow-strong"
            )}
          >
            <CheckCircle2
              className="h-12 w-12 text-ink-950"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {t("orderPlaced")}
        </h1>
        <p className="mt-2 text-sm text-white/50">{t("thanks")} 🤍</p>

        <div className="mt-7 w-full rounded-2xl glass-strong p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            {t("orderNumber")}
          </p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight text-gradient-amber tabular-nums">
            {order.orderNumber}
          </p>
          {order.tableNumber !== null && (
            <p className="mt-3 text-sm text-white/50">
              {t("table")}{" "}
              <span className="font-bold text-white">{order.tableNumber}</span>
            </p>
          )}
        </div>

        <Button
          variant="amber"
          size="lg"
          fullWidth
          onClick={onTrack}
          className="mt-6"
        >
          {t("trackOrder")}
          <ArrowRight className="h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </div>
  );
}
