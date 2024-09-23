"use server"

import { db } from "./prisma"

export const getBarbers = async () => {
  return db.user.findMany({
    where: { barber: true },
  })
}
