/*
  Warnings:

  - The `formatted_address` column on the `UKAddress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UKAddress" ALTER COLUMN "town_or_city" DROP NOT NULL,
DROP COLUMN "formatted_address",
ADD COLUMN     "formatted_address" TEXT[];
