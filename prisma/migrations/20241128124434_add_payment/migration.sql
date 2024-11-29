-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userCourseId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "limitDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "payBy" TEXT NOT NULL DEFAULT 'creditCard',
    "payAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userCourseId_fkey" FOREIGN KEY ("userCourseId") REFERENCES "UserCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
