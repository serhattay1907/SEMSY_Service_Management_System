import type { Language } from "@/types";

export type StringKey =
  | "appName"
  | "table"
  | "takeaway"
  | "searchPlaceholder"
  | "all"
  | "coffee"
  | "food"
  | "drink"
  | "dessert"
  | "addToCart"
  | "outOfStock"
  | "inCart"
  | "viewMore"
  | "viewLess"
  | "cart"
  | "emptyCart"
  | "emptyCartDesc"
  | "subtotal"
  | "placeOrder"
  | "orderNote"
  | "orderNotePlaceholder"
  | "itemNote"
  | "itemNotePlaceholder"
  | "items"
  | "confirmTitle"
  | "confirmDesc"
  | "confirm"
  | "back"
  | "placingOrder"
  | "orderPlaced"
  | "orderNumber"
  | "trackOrder"
  | "backToMenu"
  | "orderStatus"
  | "received"
  | "preparing"
  | "ready"
  | "completed"
  | "receivedDesc"
  | "preparingDesc"
  | "readyDesc"
  | "completedDesc"
  | "orderItems"
  | "placedAt"
  | "noResults"
  | "noResultsDesc"
  | "categoryEmpty"
  | "remove"
  | "quantity"
  | "thanks";

export const strings: Record<Language, Record<StringKey, string>> = {
  tr: {
    appName: "SEMSY",
    table: "Masa",
    takeaway: "Paket Sipariş",
    searchPlaceholder: "Menüde ara...",
    all: "Tümü",
    coffee: "Kahve",
    food: "Yemek",
    drink: "İçecek",
    dessert: "Tatlı",
    addToCart: "Sepete Ekle",
    outOfStock: "Tükendi",
    inCart: "Sepette",
    viewMore: "Daha fazla",
    viewLess: "Daha az",
    cart: "Sepet",
    emptyCart: "Sepetin boş",
    emptyCartDesc: "Menüden lezzetler seçmeye başla.",
    subtotal: "Ara Toplam",
    placeOrder: "Siparişi Ver",
    orderNote: "Siparişe Not",
    orderNotePlaceholder: "Tüm siparişle ilgili bir not ekle...",
    itemNote: "Ürün notu",
    itemNotePlaceholder: "Örn. az şekerli",
    items: "ürün",
    confirmTitle: "Siparişini Onayla",
    confirmDesc: "Onayladıktan sonra mutfağa iletilecek.",
    confirm: "Onayla",
    back: "Geri",
    placingOrder: "Sipariş gönderiliyor...",
    orderPlaced: "Siparişin alındı!",
    orderNumber: "Sipariş No",
    trackOrder: "Siparişi Takip Et",
    backToMenu: "Menüye Dön",
    orderStatus: "Sipariş Durumu",
    received: "Sipariş Alındı",
    preparing: "Hazırlanıyor",
    ready: "Hazır",
    completed: "Tamamlandı",
    receivedDesc: "Siparişiniz mutfağa iletildi.",
    preparingDesc: "Şefimiz harikalar yaratıyor.",
    readyDesc: "Afiyet olsun!",
    completedDesc: "Tekrar bekleriz.",
    orderItems: "Ürünler",
    placedAt: "Veriliş",
    noResults: "Sonuç bulunamadı",
    noResultsDesc: "Farklı bir kelime dene.",
    categoryEmpty: "Bu kategoride henüz ürün yok.",
    remove: "Kaldır",
    quantity: "Adet",
    thanks: "Teşekkürler",
  },
  en: {
    appName: "SEMSY",
    table: "Table",
    takeaway: "Takeaway",
    searchPlaceholder: "Search the menu...",
    all: "All",
    coffee: "Coffee",
    food: "Food",
    drink: "Drinks",
    dessert: "Desserts",
    addToCart: "Add to Cart",
    outOfStock: "Out of Stock",
    inCart: "In Cart",
    viewMore: "View more",
    viewLess: "View less",
    cart: "Cart",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Pick something delicious from the menu.",
    subtotal: "Subtotal",
    placeOrder: "Place Order",
    orderNote: "Order Note",
    orderNotePlaceholder: "Add a note for the whole order...",
    itemNote: "Item note",
    itemNotePlaceholder: "e.g. less sugar",
    items: "items",
    confirmTitle: "Confirm Your Order",
    confirmDesc: "It will be sent to the kitchen once confirmed.",
    confirm: "Confirm",
    back: "Back",
    placingOrder: "Sending order...",
    orderPlaced: "Order received!",
    orderNumber: "Order No",
    trackOrder: "Track Order",
    backToMenu: "Back to Menu",
    orderStatus: "Order Status",
    received: "Order Received",
    preparing: "Being Prepared",
    ready: "Ready",
    completed: "Completed",
    receivedDesc: "Your order is in the kitchen.",
    preparingDesc: "Our chef is working magic.",
    readyDesc: "Enjoy your meal!",
    completedDesc: "See you again soon.",
    orderItems: "Items",
    placedAt: "Placed",
    noResults: "No results found",
    noResultsDesc: "Try a different keyword.",
    categoryEmpty: "Nothing in this category yet.",
    remove: "Remove",
    quantity: "Qty",
    thanks: "Thank you",
  },
};
