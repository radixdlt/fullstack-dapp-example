/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionIntentStatus" AS ENUM ('WAITING', 'PENDING', 'ERROR', 'COMPLETED');

-- DropTable
DROP TABLE "Transaction";

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "TransactionIntent" (
    "discriminator" TEXT NOT NULL,
    "status" "TransactionIntentStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TransactionIntent_pkey" PRIMARY KEY ("discriminator")
);

-- CreateTable
CREATE TABLE "SubmittedTransaction" (
    "transactionId" TEXT NOT NULL,
    "transactionIntent" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmittedTransaction_pkey" PRIMARY KEY ("transactionId")
);

-- AddForeignKey
ALTER TABLE "TransactionIntent" ADD CONSTRAINT "TransactionIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedTransaction" ADD CONSTRAINT "SubmittedTransaction_transactionIntent_fkey" FOREIGN KEY ("transactionIntent") REFERENCES "TransactionIntent"("discriminator") ON DELETE RESTRICT ON UPDATE CASCADE;
