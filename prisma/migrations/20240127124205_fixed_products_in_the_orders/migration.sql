/*
  Warnings:

  - You are about to drop the `ProductItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "products" JSONB;

-- DropTable
DROP TABLE "ProductItem";
