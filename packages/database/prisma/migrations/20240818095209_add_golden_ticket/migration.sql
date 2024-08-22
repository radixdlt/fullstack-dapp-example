-- CreateEnum
CREATE TYPE "GoldenTicketStatus" AS ENUM ('CLAIMABLE', 'CLAIMED', 'CLAIMED_INVALID');

-- CreateTable
CREATE TABLE "GoldenTicket" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "claimedAt" TIMESTAMP(3),
    "description" TEXT,
    "status" "GoldenTicketStatus" NOT NULL DEFAULT 'CLAIMABLE',

    CONSTRAINT "GoldenTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoldenTicket" ADD CONSTRAINT "GoldenTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoldenTicket" ADD CONSTRAINT "GoldenTicket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
