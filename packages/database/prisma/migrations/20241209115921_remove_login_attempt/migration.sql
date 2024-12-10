/*
  Warnings:

  - You are about to drop the `Audit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoginAttempt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "Audit_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoginAttempt" DROP CONSTRAINT "LoginAttempt_userId_fkey";

-- DropTable
DROP TABLE "Audit";

-- DropTable
DROP TABLE "LoginAttempt";

-- DropEnum
DROP TYPE "AuditType";

-- DropEnum
DROP TYPE "LoginAttemptType";
