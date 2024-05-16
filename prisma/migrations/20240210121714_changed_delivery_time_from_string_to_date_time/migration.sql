/*
  Warnings:

  - The `deliveryTime` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryTime",
ADD COLUMN     "deliveryTime" TIMESTAMP(3);
