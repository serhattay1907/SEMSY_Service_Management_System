import { useLanguage } from "@/hooks/useLanguage";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import type { StringKey } from "@/i18n/strings";

const categories: { id: Category; key: StringKey; icon: string }[] = [
  { id: "all", key: "all", icon: "✦" },
  { id: "coffee", key: "coffee", icon: "☕" },
  { id: "drink", key: "drink", icon: "🥤" },
  { id: "food", key: "food", icon: "🍳" },
  { id: "dessert", key: "dessert", icon: "🍰" },
];

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
  counts: Record<Category, number>;
}

export function CategoryTabs({ active, onChange, counts }: CategoryTabsProps) {
  const { t } = useLanguage();

  return (
    <div
      className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-0.5"
      role="tablist"
      aria-label="Categories"
    >
      {categories.map((cat) => {
        const isActive = cat.id === active;
        const count = counts[cat.id];
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full",
              "px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              "tap-target whitespace-nowrap",
              isActive
                ? "bg-gradient-to-br from-amber to-amber-deep text-ink-950 shadow-amber-glow"
                : "glass text-white/70 hover:text-white hover:bg-white/[0.06]"
            )}
          >
            <span className="text-xs">{cat.icon}</span>
            <span>{t(cat.key)}</span>
            <span
              className={cn(
                "rounded-full px-1.5 text-[10px] font-bold",
                isActive ? "bg-black/15 text-ink-950" : "bg-white/10 text-white/50"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
