/*
  Warnings:

  - You are about to drop the column `name` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the `Trainings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yayaID` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('ONLINE', 'DOMICILE', 'ONSITE');

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainings_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "Trainings" DROP CONSTRAINT "Trainings_userId_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "name",
ADD COLUMN     "VideoUrl" TEXT,
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "CourseType" NOT NULL,
ADD COLUMN     "valideAt" TIMESTAMP(3),
ADD COLUMN     "yayaID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Trainings";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_yayaID_fkey" FOREIGN KEY ("yayaID") REFERENCES "Yaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
