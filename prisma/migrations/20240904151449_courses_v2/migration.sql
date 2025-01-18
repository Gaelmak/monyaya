/*
  Warnings:

  - You are about to drop the column `VideoUrl` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `monthlyPrice` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_categoryId_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "VideoUrl",
DROP COLUMN "price",
ADD COLUMN     "monthlyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
