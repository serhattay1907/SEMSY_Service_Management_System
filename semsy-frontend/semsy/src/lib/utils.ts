import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, lang: "tr" | "en" = "tr"): string {
  const formatted = new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return `₺${formatted}`;
}

export function generateOrderNumber(): string {
  const n = Math.floor(Math.random() * 9999) + 1;
  return `#${n.toString().padStart(4, "0")}`;
}
