-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avenue" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "municipality" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "paymentNumber" TEXT,
ADD COLUMN     "terms_accepted" BOOLEAN DEFAULT false;
