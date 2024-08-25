/*
  Warnings:

  - Added the required column `description` to the `Trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trainings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Trainings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Trainings" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
