/*
  Warnings:

  - You are about to drop the `TrainerSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainerSkills" DROP CONSTRAINT "TrainerSkills_coursesId_fkey";

-- DropForeignKey
ALTER TABLE "TrainerSkills" DROP CONSTRAINT "TrainerSkills_userId_fkey";

-- DropTable
DROP TABLE "TrainerSkills";

-- CreateTable
CREATE TABLE "Learners" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Learners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Learners" ADD CONSTRAINT "Learners_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learners" ADD CONSTRAINT "Learners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
