/*
  Warnings:

  - Added the required column `coursesId` to the `Trainings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trainings" ADD COLUMN     "coursesId" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
