-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "NewsletterSubscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "subscriptionStatus" "Status" NOT NULL DEFAULT 'active',

    CONSTRAINT "NewsletterSubscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscribers_email_key" ON "NewsletterSubscribers"("email");
