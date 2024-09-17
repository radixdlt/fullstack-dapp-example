-- CreateEnum
CREATE TYPE "FraudScoringOutput" AS ENUM ('GOLDEN_TICKET', 'IS_FARMER', 'IPQS_AGGRESSIVE', 'BLOCKED_COUNTRY', 'SANCTIONED_COUNTRY', 'PERMANENTLY_BLOCKED', 'OK');

-- AlterTable
ALTER TABLE "LoginAttempt" ADD COLUMN     "fraudScoring" "FraudScoringOutput";
