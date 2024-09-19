-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_barberId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "barberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
