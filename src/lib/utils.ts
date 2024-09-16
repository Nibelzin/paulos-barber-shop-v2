import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFormattedDuration = (duration: number) => {
  if (duration < 60) {
    return duration + " min"
  } else {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return hours + " hr " + minutes + " min"
  }
}

export const getFormettedPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}
