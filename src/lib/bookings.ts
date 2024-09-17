"use server"

import { getServerSession } from "next-auth"
import { db } from "./prisma"
import { authOptions } from "./auth"

export const getBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return db.booking.findMany({
    where: {
      userId: parseInt(session?.user.id),
    },
    include: {
      service: {},
      barber: {},
    },
    orderBy: {
      date: "asc",
    },
  })
}

export const getNextBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }
  return db.booking.findMany({
    where: {
      userId: parseInt(session?.user.id),
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {},
      barber: {},
    },
    orderBy: {
      date: "asc",
    },
  })
}

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return db.booking.findMany({
    where: {
      userId: parseInt(session?.user.id),
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {},
      barber: {},
    },
    orderBy: {
      date: "asc",
    },
  })
}