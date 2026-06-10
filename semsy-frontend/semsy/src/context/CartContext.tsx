import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Cart, CartItem, Order, Product } from "@/types";

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "UPDATE_NOTE"; note: string }
  | { type: "UPDATE_ITEM_NOTE"; productId: string; note: string }
  | { type: "CLEAR_CART" };

const initialCart: Cart = { items: [], orderNote: "" };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        if (existing.quantity >= action.product.stock) return state;
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      if (action.product.stock <= 0) return state;
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? {
                ...i,
                quantity: Math.min(action.quantity, i.product.stock),
              }
            : i
        ),
      };
    }
    case "UPDATE_NOTE":
      return { ...state, orderNote: action.note };
    case "UPDATE_ITEM_NOTE":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, itemNote: action.note }
            : i
        ),
      };
    case "CLEAR_CART":
      return initialCart;
    default:
      return state;
  }
}

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  lastOrder: Order | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNote: (note: string) => void;
  updateItemNote: (productId: string, note: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  placeOrder: (tableNumber: number | null) => Order;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [lastOrder, setLastOrder] = useReducer(
    (_: Order | null, next: Order | null) => next,
    null
  );

  const addItem = useCallback(
    (product: Product) => dispatch({ type: "ADD_ITEM", product }),
    []
  );
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  );
  const updateNote = useCallback(
    (note: string) => dispatch({ type: "UPDATE_NOTE", note }),
    []
  );
  const updateItemNote = useCallback(
    (productId: string, note: string) =>
      dispatch({ type: "UPDATE_ITEM_NOTE", productId, note }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const getQuantity = useCallback(
    (productId: string) => {
      const item = cart.items.find((i) => i.product.id === productId);
      return item?.quantity ?? 0;
    },
    [cart.items]
  );

  const subtotal = useMemo(
    () =>
      cart.items.reduce(
        (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
        0
      ),
    [cart.items]
  );

  const itemCount = useMemo(
    () =>
      cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [cart.items]
  );

  const placeOrder = useCallback(
    (tableNumber: number | null): Order => {
      const orderNum =
        "#" +
        (Math.floor(Math.random() * 9999) + 1).toString().padStart(4, "0");
      const order: Order = {
        orderNumber: orderNum,
        tableNumber,
        items: cart.items.map((i) => ({ ...i })),
        orderNote: cart.orderNote,
        total: subtotal,
        status: "pending",
        createdAt: Date.now(),
      };
      setLastOrder(order);
      dispatch({ type: "CLEAR_CART" });
      return order;
    },
    [cart.items, cart.orderNote, subtotal]
  );

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      subtotal,
      lastOrder,
      addItem,
      removeItem,
      updateQuantity,
      updateNote,
      updateItemNote,
      clearCart,
      getQuantity,
      placeOrder,
    }),
    [
      cart,
      itemCount,
      subtotal,
      lastOrder,
      addItem,
      removeItem,
      updateQuantity,
      updateNote,
      updateItemNote,
      clearCart,
      getQuantity,
      placeOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
