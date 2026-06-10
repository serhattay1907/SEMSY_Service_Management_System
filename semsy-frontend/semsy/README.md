# SEMSY — Frontend

Müşteri yüzlü web tabanlı POS sipariş ekranı. QR kodlu masa siparişi, canlı menü, sepet, sipariş takip.

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 6** — build tool
- **Tailwind CSS v3** — özel glass tasarım token'ları ile
- **React Router v6** — `/` (menü) ve `/order/:id` (durum)
- **Lucide React** — ikon seti
- **Context + useReducer** — sepet & dil state (external library yok)
- **Plus Jakarta Sans** — Google Fonts

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` veya `http://localhost:5173/?masa=3` aç.

## Build

```bash
npm run build      # tsc + vite build → dist/
npm run preview    # build'i lokal sun
npm run lint       # type-check (strict)
```

## Proje Yapısı

```
src/
├── components/
│   ├── layout/    Header, BottomBar
│   ├── menu/      SearchBar, CategoryTabs, ProductCard, ProductGrid
│   ├── cart/      CartDrawer, CartItem, CartSummary
│   ├── order/     ConfirmModal, OrderSuccess, OrderStatus (stepper)
│   └── ui/        GlassCard, Button
├── context/       CartContext (reducer), LanguageContext
├── hooks/         useCart, useLanguage
├── data/          mockData.ts (18 ürün, 4 kategori)
├── i18n/          strings.ts (TR + EN)
├── pages/         MenuPage, OrderStatusPage
├── types/         Tüm tipler — Product, Cart, Order, vb.
├── lib/           utils — cn, formatPrice
├── App.tsx
└── main.tsx
```

## Tasarım Sistemi

**Tema:** Sadece dark. Katmanlı koyu tonlar (`ink-950`, `ink-900`, `ink-800`).
**Aksan:** Sıcak amber (`#f59e0b` → `#d97706` gradient) — CTA'lar, fiyatlar, aktif durumlar.
**Cam:** `glass` ve `glass-strong` utility class'ları — backdrop-blur 16-24px, ince beyaz border.
**Tipografi:** Plus Jakarta Sans, 400-800 ağırlıklar. Büyük confident product name'leri, mute description'lar.
**Animasyon:** 200-350ms, doğal eğriler. Sepete ekle → micro-bounce. Sheet → slide-up. Modal → scale+fade. Sipariş başarı → particle yağmuru.

## Mock → Firebase Geçişi

Mock veri yapısı (`src/data/mockData.ts`) brief'teki Firebase şemasıyla birebir. Geçiş için sadece:

1. `mockProducts` → `useEffect` ile Firestore `onSnapshot('products')`
2. `placeOrder` → Firestore `addDoc('orders', ...)`
3. `OrderStatusPage`'in 8sn'lik setTimeout'u → `onSnapshot('orders/${id}')`

Mevcut Context API'leri ve component prop'ları aynı kalır.

## Kapsam Dışı

Auth, staff/manager view, ödeme entegrasyonu, fiş yazıcı, admin CRUD — hiçbiri yok (brief'te de istenmemişti).

## Notlar

- Mobile-first, 390px baseline. Tablet/desktop graceful scale.
- Tüm tap target'lar ≥44px.
- Tüm interactive element'lerde `aria-label`. Modal'larda `role="dialog"`, `aria-modal`.
- Type strict, `any` yok, `noUnusedLocals/Parameters` aktif.
