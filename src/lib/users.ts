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
