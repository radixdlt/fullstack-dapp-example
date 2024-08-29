/*
  Warnings:

  - You are about to drop the column `blocked` on the `BlockedCountry` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('OK', 'PERMANENTLY_BLOCKED', 'TEMPORARLY_BLOCKED');

-- CreateEnum
CREATE TYPE "LoginAttemptType" AS ENUM ('USER_CREATED', 'USER_LOGIN', 'USER_VERIFY');

-- CreateEnum
CREATE TYPE "CountryStatus" AS ENUM ('ALLOWED', 'BLOCKED', 'SANCTIONED');

-- AlterTable
ALTER TABLE "BlockedCountry" DROP COLUMN "blocked",
ADD COLUMN     "status" "CountryStatus" NOT NULL DEFAULT 'ALLOWED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'OK';

-- CreateTable
CREATE TABLE "IpAssessment" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "acceptLanguage" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IpAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAssessmentId" INTEGER NOT NULL,
    "type" "LoginAttemptType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IpAssessment_ip_createdAt_idx" ON "IpAssessment"("ip", "createdAt");

-- CreateIndex
CREATE INDEX "LoginAttempt_userId_idx" ON "LoginAttempt"("userId");

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_ipAssessmentId_fkey" FOREIGN KEY ("ipAssessmentId") REFERENCES "IpAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
