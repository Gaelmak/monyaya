/*
  Warnings:

  - You are about to drop the `Learners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Learners" DROP CONSTRAINT "Learners_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "Learners" DROP CONSTRAINT "Learners_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTrainerValidated" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "Learners";

-- CreateTable
CREATE TABLE "Yaya" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "Yaya_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yaya_userId_key" ON "Yaya"("userId");

-- AddForeignKey
ALTER TABLE "Yaya" ADD CONSTRAINT "Yaya_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
