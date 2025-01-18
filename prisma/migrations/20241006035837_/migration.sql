-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_yayaID_fkey";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_yayaID_fkey" FOREIGN KEY ("yayaID") REFERENCES "Yaya"("id") ON DELETE CASCADE ON UPDATE CASCADE;
