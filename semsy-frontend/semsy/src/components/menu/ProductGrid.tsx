import { SearchX, PackageX } from "lucide-react";
import type { Product, Category } from "@/types";
import { ProductCard } from "./ProductCard";
import { useLanguage } from "@/hooks/useLanguage";
import type { StringKey } from "@/i18n/strings";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  category: Category;
}

const categoryLabel: Record<Exclude<Category, "all">, StringKey> = {
  coffee: "coffee",
  food: "food",
  drink: "drink",
  dessert: "dessert",
};

export function ProductGrid({
  products,
  searchQuery,
  category,
}: ProductGridProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    const isSearchEmpty = searchQuery.length > 0;
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl">
          {isSearchEmpty ? (
            <SearchX className="h-7 w-7 text-white/40" />
          ) : (
            <PackageX className="h-7 w-7 text-white/40" />
          )}
        </div>
        <div>
          <p className="text-base font-semibold text-white">
            {isSearchEmpty ? t("noResults") : t("categoryEmpty")}
          </p>
          {isSearchEmpty && (
            <p className="mt-1 text-sm text-white/40">{t("noResultsDesc")}</p>
          )}
        </div>
      </div>
    );
  }

  // Group by category when "all" is selected and no search
  if (category === "all" && searchQuery.length === 0) {
    const grouped = products.reduce(
      (acc: Record<string, Product[]>, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
      },
      {}
    );

    const order: Array<Exclude<Category, "all">> = [
      "coffee",
      "drink",
      "food",
      "dessert",
    ];

    return (
      <div className="space-y-7">
        {order.map((cat) =>
          grouped[cat] && grouped[cat].length > 0 ? (
            <section
              key={cat}
              className="animate-fade-slide-up"
              aria-labelledby={`heading-${cat}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/5" />
                <h2
                  id={`heading-${cat}`}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40"
                >
                  {t(categoryLabel[cat])}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/5" />
              </div>
              <div className="space-y-2.5">
                {grouped[cat].map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2.5 animate-fade-slide-up">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
