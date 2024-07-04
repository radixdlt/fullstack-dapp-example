/*
  Warnings:

  - You are about to drop the `ReferralXrd` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReferralAction" AS ENUM ('INC', 'DEC');

-- DropForeignKey
ALTER TABLE "ReferralXrd" DROP CONSTRAINT "ReferralXrd_userId_fkey";

-- DropTable
DROP TABLE "ReferralXrd";

-- CreateTable
CREATE TABLE "Referral" (
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "ReferralAction" NOT NULL,
    "xrdValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_eventId_key" ON "Referral"("eventId");

-- CreateIndex
CREATE INDEX "Referral_userId_idx" ON "Referral"("userId");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
