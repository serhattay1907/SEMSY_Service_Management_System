import { Search, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "glass flex items-center gap-3 rounded-2xl px-4",
        "h-12 transition-all duration-200",
        "focus-within:border-amber/40 focus-within:shadow-amber-glow"
      )}
    >
      <Search className="text-white/40" size={18} strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className={cn(
          "flex-1 bg-transparent text-sm text-white placeholder:text-white/30",
          "outline-none border-0 focus:ring-0"
        )}
        aria-label={t("searchPlaceholder")}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
