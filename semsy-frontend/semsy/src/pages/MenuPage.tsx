import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";
import { SearchBar } from "@/components/menu/SearchBar";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ConfirmModal } from "@/components/order/ConfirmModal";
import { OrderSuccess } from "@/components/order/OrderSuccess";
import { mockProducts } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/hooks/useLanguage";
import type { Category, Order } from "@/types";

export function MenuPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { placeOrder } = useCart();

  const tableParam = searchParams.get("masa");
  const tableNumber = tableParam ? parseInt(tableParam, 10) : null;
  const validTable =
    tableNumber !== null && !isNaN(tableNumber) ? tableNumber : null;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const activeProducts = useMemo(
    () => mockProducts.filter((p) => p.isActive),
    []
  );

  const counts = useMemo(() => {
    const c: Record<Category, number> = {
      all: activeProducts.length,
      coffee: 0,
      food: 0,
      drink: 0,
      dessert: 0,
    };
    activeProducts.forEach((p) => {
      c[p.category]++;
    });
    return c;
  }, [activeProducts]);

  const filtered = useMemo(() => {
    let result = activeProducts;
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter((p) => {
        const name = lang === "tr" ? p.name : p.nameEn;
        const desc = lang === "tr" ? p.description : p.descriptionEn;
        return (
          name.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
        );
      });
    }
    return result;
  }, [activeProducts, category, query, lang]);

  const handlePlaceOrder = () => {
    setCartOpen(false);
    // small delay so sheet closes before modal opens
    window.setTimeout(() => setConfirmOpen(true), 200);
  };

  const handleConfirm = async () => {
    setPlacing(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    const order = placeOrder(validTable);
    setPlacing(false);
    setConfirmOpen(false);
    setSuccessOrder(order);
  };

  const handleTrack = () => {
    if (successOrder) {
      navigate(`/order/${successOrder.orderNumber.replace("#", "")}`);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Header tableNumber={validTable} />

      <main className="mx-auto max-w-3xl px-4 pt-4 pb-6">
        {/* Search */}
        <div className="space-y-3">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryTabs
            active={category}
            onChange={setCategory}
            counts={counts}
          />
        </div>

        {/* Products */}
        <div className="mt-5">
          <ProductGrid
            products={filtered}
            searchQuery={query}
            category={category}
          />
        </div>
      </main>

      <BottomBar onOpenCart={() => setCartOpen(true)} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <ConfirmModal
        open={confirmOpen}
        loading={placing}
        tableNumber={validTable}
        onConfirm={handleConfirm}
        onBack={() => setConfirmOpen(false)}
      />

      {successOrder && (
        <OrderSuccess order={successOrder} onTrack={handleTrack} />
      )}
    </div>
  );
}
