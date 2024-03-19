-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'PROCESSED', 'ERROR_INVALID_DATA', 'ERROR_USER_NOT_FOUND', 'ERROR_UNHANDLED_EVENT');

-- CreateEnum
CREATE TYPE "AuditType" AS ENUM ('DIRECT_DEPOSIT', 'CLAIMBOX_DEPOSIT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'ERROR_KYC_REQUIRED', 'ERROR_FAILED_TO_SUBMIT', 'ERROR_TIMEOUT', 'ERROR_UNKNOWN', 'COMPLETED', 'IN_PROGRESS');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Audit" (
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "AuditType" NOT NULL,
    "metadata" JSONB NOT NULL,
    "xrdUsdValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "attempt" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "transactionKey" TEXT NOT NULL,
    "transactionId" TEXT,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionKey","userId","attempt")
);

-- CreateIndex
CREATE INDEX "Audit_userId_idx" ON "Audit"("userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
