/*
  Warnings:

  - You are about to drop the `DeliveryTines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeliveryTines" DROP CONSTRAINT "DeliveryTines_restaurantId_fkey";

-- DropTable
DROP TABLE "DeliveryTines";

-- CreateTable
CREATE TABLE "DeliveryTimes" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "DeliveryTimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeliveryTimes" ADD CONSTRAINT "DeliveryTimes_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
