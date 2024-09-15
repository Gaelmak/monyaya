-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "sectionId" TEXT;

-- CreateTable
CREATE TABLE "Sections" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
