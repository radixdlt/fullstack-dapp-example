-- AlterTable
ALTER TABLE "TransactionIntent" ADD COLUMN     "batchId" TEXT;

-- CreateTable
CREATE TABLE "BatchedTransactionIntent" (
    "id" TEXT NOT NULL,
    "status" "TransactionIntentStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "BatchedTransactionIntent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BatchedTransactionIntent_status_createdAt_idx" ON "BatchedTransactionIntent"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "TransactionIntent" ADD CONSTRAINT "TransactionIntent_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "BatchedTransactionIntent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
