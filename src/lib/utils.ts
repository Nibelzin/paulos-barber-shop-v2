import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

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

export const generateTimeSlots = (
  start: string,
  end: string,
  interval: number,
) => {
  const times = []
  let current = dayjs(start, "HH:mm")

  while (
    current.isBefore(dayjs(end, "HH:mm")) ||
    current.isSame(dayjs(end, "HH:mm"))
  ) {
    times.push(current.format("HH:mm"))
    current = current.add(interval, "minute")
  }

  return times
}
