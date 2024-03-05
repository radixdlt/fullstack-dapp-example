/*
  Warnings:

  - A unique constraint covering the columns `[accountAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE "Event";
TRUNCATE TABLE "Notification";
TRUNCATE TABLE "User";

SET FOREIGN_KEY_CHECKS = 1;


-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('IN_PROGRESS', 'READY_TO_CLAIM_REWARDS', 'COMPLETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountAddress" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CompletedQuestRequirement" (
    "questId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompletedQuestRequirement_pkey" PRIMARY KEY ("questId","userId","requirementId")
);

-- CreateTable
CREATE TABLE "QuestProgress" (
    "questId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" "QuestStatus" NOT NULL DEFAULT 'IN_PROGRESS',

    CONSTRAINT "QuestProgress_pkey" PRIMARY KEY ("questId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_accountAddress_key" ON "User"("accountAddress");

-- AddForeignKey
ALTER TABLE "CompletedQuestRequirement" ADD CONSTRAINT "CompletedQuestRequirement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
