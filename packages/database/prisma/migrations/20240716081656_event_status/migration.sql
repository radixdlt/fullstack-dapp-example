/*
  Warnings:

  - You are about to drop the column `processedAt` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('WAITING', 'PENDING', 'ERROR', 'COMPLETED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "processedAt",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false;
