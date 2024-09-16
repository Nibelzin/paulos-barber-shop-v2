"use server"

import { db } from "./prisma"

export const getBarbers = async () => {
  return db.barber.findMany()
}
