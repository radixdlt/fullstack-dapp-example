-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('OK', 'PERMANENTLY_BLOCKED', 'TEMPORARILY_BLOCKED');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('RadMorph', 'RadGem', 'Card');

-- CreateEnum
CREATE TYPE "ReferralAction" AS ENUM ('INC', 'DEC');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('WAITING', 'PENDING', 'ERROR', 'COMPLETED', 'FAILED_RETRY', 'FAILED_PERMANENT', 'PAUSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuestStatus" AS ENUM ('IN_PROGRESS', 'REWARDS_DEPOSITED', 'REWARDS_CLAIMED', 'COMPLETED', 'PARTIALLY_COMPLETED');

-- CreateEnum
CREATE TYPE "TransactionIntentStatus" AS ENUM ('WAITING', 'PENDING', 'ERROR', 'COMPLETED', 'FAILED_RETRY', 'FAILED_PERMANENT', 'PAUSED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT '',
    "identityAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountAddress" TEXT,
    "name" TEXT,
    "country" TEXT,
    "type" "UserType" NOT NULL DEFAULT 'USER',
    "referralCode" TEXT NOT NULL,
    "referredBy" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'OK',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "ReferralAction" NOT NULL,
    "xrdValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "challenge" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("challenge")
);

-- CreateTable
CREATE TABLE "Event" (
    "transactionId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questId" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenAt" TIMESTAMP(3),
    "data" JSONB NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId","userId")
);

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
    "status" "QuestStatus" NOT NULL DEFAULT 'IN_PROGRESS',

    CONSTRAINT "QuestProgress_pkey" PRIMARY KEY ("questId","userId")
);

-- CreateTable
CREATE TABLE "SavedProgress" (
    "userId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "SavedProgress_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "TransactionIntent" (
    "discriminator" TEXT NOT NULL,
    "status" "TransactionIntentStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "userId" TEXT NOT NULL,
    "data" JSONB,
    "batchId" TEXT,

    CONSTRAINT "TransactionIntent_pkey" PRIMARY KEY ("discriminator")
);

-- CreateTable
CREATE TABLE "BatchedTransactionIntent" (
    "id" TEXT NOT NULL,
    "status" "TransactionIntentStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "BatchedTransactionIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmittedTransaction" (
    "transactionId" TEXT NOT NULL,
    "transactionIntent" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmittedTransaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identityAddress_key" ON "User"("identityAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_eventId_key" ON "Referral"("eventId");

-- CreateIndex
CREATE INDEX "Referral_userId_idx" ON "Referral"("userId");

-- CreateIndex
CREATE INDEX "Event_userId_status_idx" ON "Event"("userId", "status");

-- CreateIndex
CREATE INDEX "Message_userId_seenAt_idx" ON "Message"("userId", "seenAt");

-- CreateIndex
CREATE INDEX "TransactionIntent_status_createdAt_idx" ON "TransactionIntent"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BatchedTransactionIntent_status_createdAt_idx" ON "BatchedTransactionIntent"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "User"("referralCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedQuestRequirement" ADD CONSTRAINT "CompletedQuestRequirement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestProgress" ADD CONSTRAINT "QuestProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProgress" ADD CONSTRAINT "SavedProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionIntent" ADD CONSTRAINT "TransactionIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionIntent" ADD CONSTRAINT "TransactionIntent_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "BatchedTransactionIntent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedTransaction" ADD CONSTRAINT "SubmittedTransaction_transactionIntent_fkey" FOREIGN KEY ("transactionIntent") REFERENCES "TransactionIntent"("discriminator") ON DELETE RESTRICT ON UPDATE CASCADE;
