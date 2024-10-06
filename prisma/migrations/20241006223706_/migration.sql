/*
  Warnings:

  - You are about to drop the column `monthlyPrice` on the `Courses` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PricePer" AS ENUM ('MONTH', 'SECTION');

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "monthlyPrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "pricePer" "PricePer" NOT NULL DEFAULT 'MONTH';
