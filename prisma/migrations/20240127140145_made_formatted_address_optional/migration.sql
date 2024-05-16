-- AlterTable
ALTER TABLE "UKAddress" ALTER COLUMN "formatted_address" DROP NOT NULL,
ALTER COLUMN "formatted_address" SET DATA TYPE TEXT;
