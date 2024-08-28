-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('FULL', 'LIMITED');

-- AlterTable
ALTER TABLE "GoldenTicket" ADD COLUMN     "type" "TicketType" NOT NULL DEFAULT 'FULL';
