/*
  Warnings:

  - You are about to drop the column `referredBy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "referredBy";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralCode_fkey" FOREIGN KEY ("referralCode") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
