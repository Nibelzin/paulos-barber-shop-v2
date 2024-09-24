"use server"

import { db } from "./prisma"

export const getBarbers = async () => {
  return db.user.findMany({
    where: { barber: true },
  })
}

export const setBarberToUser = async (id: number) => {
  const deleteBarberBookings = await db.booking.deleteMany({
    where: { barberId: id },
  })

  const result = await db.user.update({
    where: { id: id },
    data: {
      barber: false,
    },
  })
}
