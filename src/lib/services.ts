"use server"

import { db } from "./prisma"

export const getServices = async () => {
  return db.service.findMany()
}

export const getSoloServices = async () => {
  return db.service.findMany({
    where: {
      combo: false,
    },
  })
}

export const getComboServices = async () => {
  return db.service.findMany({
    where: {
      combo: true,
    },
  })
}
