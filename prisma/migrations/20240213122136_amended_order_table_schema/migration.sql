/*
  Warnings:

  - You are about to drop the column `discount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discount",
DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "deliveryCharge" DECIMAL(65,30),
ADD COLUMN     "discountCode" TEXT,
ADD COLUMN     "discountedAmount" DECIMAL(65,30),
ADD COLUMN     "orderNotes" TEXT,
ADD COLUMN     "orderStatus" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL;
