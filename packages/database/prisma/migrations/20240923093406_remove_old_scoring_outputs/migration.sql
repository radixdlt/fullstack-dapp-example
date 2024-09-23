/*
  Warnings:

  - The values [GOLDEN_TICKET,IS_FARMER,IPQS_AGGRESSIVE,BLOCKED_COUNTRY,SANCTIONED_COUNTRY,PERMANENTLY_BLOCKED,OK] on the enum `FraudScoringOutput` will be removed. If these variants are still used in the database, this will fail.

*/
BEGIN;
UPDATE "LoginAttempt" SET "fraudScoring" = 'ALLOWED' WHERE "fraudScoring" = 'OK';
UPDATE "LoginAttempt" SET "fraudScoring" = 'ALLOWED_GOLDEN_TICKET' WHERE "fraudScoring" = 'GOLDEN_TICKET';
UPDATE "LoginAttempt" SET "fraudScoring" = 'BLOCKED_IS_FARMER' WHERE "fraudScoring" = 'IS_FARMER';
UPDATE "LoginAttempt" SET "fraudScoring" = 'BLOCKED_IPQS_SCORE' WHERE "fraudScoring" = 'IPQS_AGGRESSIVE';
UPDATE "LoginAttempt" SET "fraudScoring" = 'BLOCKED_BLOCKED_COUNTRY' WHERE "fraudScoring" = 'BLOCKED_COUNTRY';
UPDATE "LoginAttempt" SET "fraudScoring" = 'BLOCKED_SANCTIONED_COUNTRY' WHERE "fraudScoring" = 'SANCTIONED_COUNTRY';
UPDATE "LoginAttempt" SET "fraudScoring" = 'BLOCKED_PERMANENTLY_BLOCKED' WHERE "fraudScoring" = 'PERMANENTLY_BLOCKED';

-- AlterEnum
CREATE TYPE "FraudScoringOutput_new" AS ENUM ('ALLOWED', 'ALLOWED_NO_IPQS_DATA', 'ALLOWED_GOLDEN_TICKET', 'BLOCKED_IS_FARMER', 'BLOCKED_IPQS_SCORE', 'BLOCKED_SANCTIONED_COUNTRY', 'BLOCKED_BLOCKED_COUNTRY', 'BLOCKED_PERMANENTLY_BLOCKED');
ALTER TABLE "LoginAttempt" ALTER COLUMN "fraudScoring" TYPE "FraudScoringOutput_new" USING ("fraudScoring"::text::"FraudScoringOutput_new");
ALTER TYPE "FraudScoringOutput" RENAME TO "FraudScoringOutput_old";
ALTER TYPE "FraudScoringOutput_new" RENAME TO "FraudScoringOutput";
DROP TYPE "FraudScoringOutput_old";
COMMIT;
