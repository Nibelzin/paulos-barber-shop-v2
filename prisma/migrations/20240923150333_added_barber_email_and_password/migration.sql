/*
  Warnings:

  - Added the required column `admin` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "admin" BOOLEAN NOT NULL;
