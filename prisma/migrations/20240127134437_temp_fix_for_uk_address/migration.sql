/*
  Warnings:

  - You are about to drop the column `deliveryAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ukAddressId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryAddress",
DROP COLUMN "ukAddressId",
ADD COLUMN     "uKAddressId" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_uKAddressId_fkey" FOREIGN KEY ("uKAddressId") REFERENCES "UKAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
