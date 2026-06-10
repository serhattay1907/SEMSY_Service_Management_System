import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { MenuPage } from "@/pages/MenuPage";
import { OrderStatusPage } from "@/pages/OrderStatusPage";

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/order/:orderId" element={<OrderStatusPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </LanguageProvider>
  );
}
