-- DropForeignKey
ALTER TABLE "Sections" DROP CONSTRAINT "Sections_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
