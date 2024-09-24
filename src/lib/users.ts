"use server"

import { db } from "./prisma"

export const getUsers = async (page: number, itemsPerPage: number = 10) => {
  const currPage = (page - 1) * itemsPerPage

  return await db.user.findMany({
    where: { barber: false },
    skip: currPage,
    take: itemsPerPage,
  })
}

export const getAllUsers = async () => {
  return await db.user.findMany({
    where: { barber: false },
  })
}

export const setUserToBarber = async (id: number) => {
  const result = await db.user.update({
    where: { id: id },
    data: {
      barber: true,
    },
  })
}

export const setUserAdmin = async (id: number, setAdmin: boolean) => {
  const result = await db.user.update({
    where: { id: id },
    data: {
      admin: setAdmin,
    },
  })
  return result
}
