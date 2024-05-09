/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `badgeId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `badgeResourceAddress` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "userId",
ADD COLUMN     "badgeId" TEXT NOT NULL,
ADD COLUMN     "badgeResourceAddress" TEXT NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionKey", "badgeId", "badgeResourceAddress", "attempt");
