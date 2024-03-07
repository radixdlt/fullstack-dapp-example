/*
  Warnings:

  - The values [READY_TO_CLAIM_REWARDS] on the enum `QuestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestStatus_new" AS ENUM ('IN_PROGRESS', 'REWARDS_DEPOSITED', 'REWARDS_CLAIMED', 'COMPLETED');
ALTER TABLE "QuestProgress" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "QuestProgress" ALTER COLUMN "status" TYPE "QuestStatus_new" USING ("status"::text::"QuestStatus_new");
ALTER TYPE "QuestStatus" RENAME TO "QuestStatus_old";
ALTER TYPE "QuestStatus_new" RENAME TO "QuestStatus";
DROP TYPE "QuestStatus_old";
ALTER TABLE "QuestProgress" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;
