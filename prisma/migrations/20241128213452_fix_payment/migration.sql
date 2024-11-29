/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `price` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "payBy" DROP NOT NULL,
ALTER COLUMN "payBy" DROP DEFAULT;
