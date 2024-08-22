/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GoldenTicket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GoldenTicket_userId_key" ON "GoldenTicket"("userId");
