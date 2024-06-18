-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referralCode_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referredBy" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "User"("referralCode") ON DELETE SET NULL ON UPDATE CASCADE;
