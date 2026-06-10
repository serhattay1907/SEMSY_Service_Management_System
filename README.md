# SEMSY — Smart Enterprise Management System

> Web-based Point of Sale (POS) and Enterprise Resource Planning (ERP) system for cafés and restaurants.  
> Real-time QR ordering · Kitchen display · Cashier panel · Manager dashboard · Ingredient-level inventory

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Data Model](#data-model)
- [User Roles & Access](#user-roles--access)
- [Known Limitations](#known-limitations)
- [Team](#team)

---

## Overview

SEMSY digitizes the complete restaurant workflow — from the moment a customer scans a QR code to the moment the bill is paid and the manager reviews daily analytics. All three roles (Customer, Staff, Manager) share a live operational state through Firebase real-time listeners, eliminating manual order transcription, reducing stock errors, and providing a single source of truth for the entire operation.

```
Customer (QR) ──▶ Firebase ──▶ Kitchen screen (Staff)
                      │
                      └──▶ Cashier panel ──▶ Manager dashboard
```

---

## Features

### Customer
- No app install required — opens in any mobile browser via QR code
- Stock-aware menu: each product shows the maximum orderable quantity based on live ingredient stock
- Per-item notes, customer name & phone, table or delivery (Paket) mode
- Real-time order status tracking after submission

### Staff
- **Kitchen tab** — incoming orders with audio alert, mark as Ready / Delivered
- **Cashier tab** — full and partial payments, POS simulation, table transfer, receipt printing
- **History tab** — searchable order log with status filters
- Draft editing mode: modify active orders without touching live state until confirmed

### Manager
- Menu CRUD with BOM (Bill of Materials) recipe editor per product
- Inventory CRUD: add/subtract/set stock per ingredient (ml / gr / adet)
- **Runway estimation** — color-coded days-until-depletion per ingredient (🔴 < 2d · 🟡 2–5d · 🟢 > 5d)
- Business intelligence dashboard: revenue, AOV, consumption, waste/fire analysis
- Advanced order history with date, status, table, and payment filters

### System
- Atomic order creation: order number + stock deduction committed in a single Firebase multi-path update
- Sequential unique order numbers via Firebase `runTransaction` on `/orderCounter`
- Waste tracking: cancelled-after-ready items flagged `isWaste=true`, no stock refund

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser Clients                │
│  Customer.tsx  │  Staff.tsx  │  Manager.tsx     │
│  (public QR)   │  (auth'd)   │  (auth + role)  │
└────────┬────────────┬────────────────┬──────────┘
         │            │                │
         │ POST       │ onValue()      │ onValue()
         │ /checkout  │ Firebase SDK   │ Firebase SDK
         ▼            │                │
┌─────────────────┐   │                │
│  Express 5      │   │                │
│  server.js      │   ▼                ▼
│                 │  ┌─────────────────────────────┐
│  • stock read   │  │  Firebase Cloud             │
│  • validate     │──▶  Realtime Database          │
│  • tx counter   │  │  Authentication             │
│  • atomic write │  │  (europe-west1)             │
└─────────────────┘  └─────────────────────────────┘
```

**Client-heavy design:** React pages own presentation and most operational logic. The Express backend handles only the checkout endpoint — where server-side atomicity is required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM 7 |
| Database | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Backend | Express 5, Node.js |
| Admin SDK | Firebase Admin SDK |
| Build | Vite (frontend), Node (backend) |

---

## Project Structure

```
semsy/
├── semsy-app/                  # React frontend
│   ├── src/
│   │   ├── App.tsx             # Router + auth state
│   │   ├── Login.tsx           # Firebase email/password login
│   │   ├── ProtectedRoute.tsx  # Role-based route guard
│   │   ├── firebase.ts         # Firebase client SDK init
│   │   ├── Customer.tsx        # QR ordering interface
│   │   ├── Staff.tsx           # Kitchen + cashier + history
│   │   ├── Manager.tsx         # Admin dashboard
│   │   └── types/
│   │       └── index.ts        # Shared TypeScript interfaces
│   ├── public/
│   └── vite.config.ts
│
└── semsy-backend/              # Express checkout service
    └── server.js               # POST /api/checkout
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Realtime Database and Authentication enabled

### 1. Clone the repo

```bash
git clone https://github.com/your-org/semsy.git
cd semsy
```

### 2. Frontend

```bash
cd semsy-app
npm install
cp .env.example .env          # fill in Firebase config
npm run dev                   # starts on http://localhost:5173
```

### 3. Backend

```bash
cd semsy-backend
npm install
# place your Firebase service account key → serviceAccountKey.json
# ⚠ do NOT commit this file
node server.js                # starts on http://localhost:5000
```

---

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database** (choose a region — `europe-west1` recommended)
3. Enable **Authentication → Email/Password**
4. Download a **service account key** (Project Settings → Service accounts) and save it as `semsy-backend/serviceAccountKey.json`
5. Add the following paths to your database (they are created automatically on first use):
   - `/menu`
   - `/inventory`
   - `/orders`
   - `/orderCounter` → set initial value to `0`

### Initial database structure

```json
{
  "orderCounter": 0,
  "menu": {},
  "inventory": {},
  "orders": {}
}
```

---

## Environment Variables

### Frontend — `semsy-app/.env`

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=http://localhost:5000
```

### Backend — `semsy-backend/.env` *(or deployment secrets)*

```env
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.europe-west1.firebasedatabase.app
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

> **Never commit `serviceAccountKey.json` or any `.env` files.** Add both to `.gitignore`.

---

## How It Works

### Order checkout (atomic flow)

```
1. Customer submits cart → POST /api/checkout
2. Backend reads fresh /inventory snapshot
3. Validates: for each ingredient, stock ≥ required amount
4. runTransaction(/orderCounter) → atomic increment → unique order number
5. db.ref('/').update({
     /orders/{id}: orderObject,
     /inventory/{ing}/stock: newValue,
     ...
   })  ← single atomic multi-path write
6. Firebase pushes to all onValue() listeners
7. Kitchen screen receives the new pending order with audio alert
```

### Order state machine

```
         [checkout success]
               │
           pending ──────────────────▶ cancelled
               │         (refunds stock)
         [staff: ready]
               │
            ready ───────────────────▶ cancelled
               │      (isWaste=true, NO stock refund)
         [staff: delivered]
               │
          completed
               │
         [cashier: paid]
               │
           isPaid=true
```

**Key rule:** Items cancelled from `pending` state return stock to inventory. Items cancelled from `ready` state have already been physically prepared — stock is not refunded and the quantity is recorded as **waste (fire)**.

### Real-time propagation

All clients subscribe to `/menu`, `/inventory`, and `/orders` via `onValue()` listeners. Every status change, stock update, or new order is pushed to all connected browsers within milliseconds — no polling required. Listeners are cleaned up in React `useEffect` return functions to prevent memory leaks.

---

## Data Model

```typescript
// types/index.ts

interface Ingredient {
  id: string;
  name: string;
  unit: 'ml' | 'gr' | 'adet';
  stock: number;
}

interface RecipeItem {
  ingredientId: string;
  ingredientName: string;  // denormalized for receipt integrity
  amount: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  active: boolean;
  recipe: RecipeItem[];
}

interface OrderItem {
  id: string;
  name: string;
  price: number;        // captured at order time
  qty: number;
  note: string;
  status: OrderStatus;
  isPaid: boolean;
  isWaste: boolean;
}

interface Order {
  id: string;
  orderNo: number;      // sequential, guaranteed unique via transaction
  tableNo: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
  isPaid: boolean;
  orderType: 'table' | 'delivery';
  note: string;
  time: number;         // Unix timestamp
}
```

### Firebase paths

| Path | Description |
|---|---|
| `/menu/{productId}` | Products with embedded recipe arrays |
| `/inventory/{ingredientId}` | Ingredients with live stock values |
| `/orders/{orderId}` | Orders with embedded OrderItem arrays |
| `/orderCounter` | Atomic integer, incremented by `runTransaction` |

---

## User Roles & Access

| Actor | Menu | Inventory | Orders | Payments | Analytics | Auth |
|---|---|---|---|---|---|---|
| Customer | Read (active only) | Read (availability) | Create via checkout; read own table | — | — | Public |
| Staff | Read | Read | Read/Update lifecycle | Create/Update | Read history | Firebase auth |
| Manager | Full CRUD | Full CRUD | Read | Read | Full | Firebase auth + role |
| Checkout service | Read (recipes) | Read/Update (atomic) | Create | — | — | Admin SDK |

---

## Known Limitations

This is an academic prototype. The following items are documented in the production hardening backlog:

| Priority | Issue |
|---|---|
| 🔴 P0 | Firebase service account key must be removed from source control and rotated |
| 🔴 P0 | Firebase Security Rules not yet enforced — client route guard is UX only, not a security boundary |
| 🔴 P0 | Checkout stock validation is not fully transactional — two simultaneous requests can oversell the same stock |
| 🟡 P1 | Partial payment and table transfer use a multi-step client loop — failure between writes can duplicate or lose items |
| 🟡 P1 | API base URL and CORS origin are hardcoded — must be environment-variable driven for production |
| 🟡 P1 | No automated tests or CI pipeline |
| 🟡 P1 | Ingredient deletion can break recipe references — soft-delete + dependency check needed |
| ⚪ P2 | Manager analytics runs entirely in the browser — server-side aggregation needed at scale |
| ⚪ P2 | POS is a simulator (80 % success rate) — replace with certified payment provider for production |

---

## Team

**CENG3004 — Software Engineering · 2025–2026 Spring**

| Name | Student ID | Role |
|---|---|---|
| Ercüment Sezer Kartal | 230709020 | Subject Matter Expert |
| Nehir Yılmaz | 220709081 | |
| Abdullah Özdemir | 220709002 | |
| Serhat Tay | 220709054 | |
| İbrahim Çinğay | 210709018 | |

---

*Design document baseline: IEEE 1016-2009 · UML 2.5.1 · OWASP Top 10 (2021) · KVKK*
