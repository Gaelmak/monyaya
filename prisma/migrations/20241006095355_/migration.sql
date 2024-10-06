-- DropForeignKey
ALTER TABLE "Yaya" DROP CONSTRAINT "Yaya_userId_fkey";

-- AddForeignKey
ALTER TABLE "Yaya" ADD CONSTRAINT "Yaya_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
